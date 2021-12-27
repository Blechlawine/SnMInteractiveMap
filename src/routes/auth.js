const express = require("express");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const app = express();

const Validator = require("../model/validation").User;
const { parseCookie } = require("../utils").cookie;
const { RefreshToken, User } = require("../model");
const { generateJWT, generateRefreshToken } = require("../utils").token;
const { hashPassword } = require("../utils").user;

const cookieName = "snmInteractiveMapToken";

app.get("/refreshToken", (req, res) => {
    new Promise(async (resolve, reject) => {
        let cookies = parseCookie(req);
        if (cookies) {
            if (cookies[cookieName]) {
                let decoded = jwt.verify(cookies[cookieName], process.env.JWT_REFRESH_SECRET);
                if (decoded) {
                    let oldToken = await RefreshToken.findOne({
                        where: {
                            token: cookies[cookieName],
                        },
                    });
                    if (oldToken) {
                        let user = await User.findByPk(oldToken.userId);
                        await oldToken.destroy();
                        let refreshToken = await RefreshToken.create({
                            name: req.get("user-agent"),
                            token: generateRefreshToken(user),
                            userId: user.id,
                        });
                        res.cookie(cookieName, refreshToken.token, {
                            httpOnly: true,
                            expires: dayjs().add(30, "days").toDate(),
                        });
                        let jwt = generateJWT(user);
                        resolve({
                            message: "Tokens refreshed",
                            token: jwt,
                            user: {
                                username: user.username,
                                id: user.id,
                            },
                        });
                    }
                }
            }
        }
        reject({
            message: "Request failed with errors",
            errors: ["Not a valid refresh token"],
        });
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((data) => {
            res.status(401).json(data);
        });
});

app.get("/logout", async (req, res) => {
    if (res.locals.authenticated) {
        let cookies = parseCookie(req);
        if (cookies) {
            if (cookies.snmInteractiveMapToken) {
                let refreshToken = await RefreshToken.findOne({
                    where: {
                        token: cookies.snmInteractiveMapToken,
                    },
                }).then((refreshToken) => {
                    refreshToken.destroy();
                    res.clearCookie(cookieName);
                    res.status(200).json({
                        message: "successfully logged out",
                    });
                });
            }
        }
    }
    res.status(401).json({
        errors: ["Couldn't log out"],
        message: "Logout failed with errors",
    });
});

app.post("/register", async (req, res) => {
    let validated = Validator.RegisterUser.validate(req.body);
    if (validated.error) {
        // user input is not valid
        res.status(400).json({
            message: "Registration failed with errors",
            errors: validated.error.details.map((err) => ({ message: err.message, type: err.type })),
        });
    } else {
        let userData = validated.value;
        let validCode = process.env.REGISTER_CODE;
        if (validCode !== undefined && validCode !== null && validCode !== "") {
            // theres a valid reference code supplied via an environment variable
            if (userData.referenceCode !== validCode) {
                res.status(400).json({
                    message: "Registration failed with errors",
                    errors: ["Invalid reference code"],
                });
            } else {
                // user has provided a valid reference code and
                // user input is valid
                // => check if user with email already exists
                let usersWithThisEmail = await User.findAll({
                    where: {
                        email: userData.email,
                    },
                });
                if (usersWithThisEmail.length > 0) {
                    // a user with this email already exists
                    res.status(400).json({
                        message: "Registration failed with errors",
                        errors: ["Email already registered"],
                    });
                } else {
                    // a user does not already exist, => create user and send tokens to client
                    let { salt, hash } = hashPassword(userData.password);
                    let newUser = await User.create({
                        email: userData.email,
                        username: userData.username,
                        hash,
                        salt,
                        referenceCode: userData.referenceCode,
                    });
                    let refreshToken = await RefreshToken.create({
                        name: req.get("user-agent"),
                        token: generateRefreshToken(newUser),
                        userId: newUser.id,
                    });
                    let jwt = generateJWT(newUser);
                    res.cookie(cookieName, refreshToken.token, {
                        httpOnly: true,
                        expires: dayjs().add(30, "days").toDate(),
                    });
                    res.status(200).json({
                        message: "User registered",
                        user: {
                            username: newUser.username,
                            id: newUser.id,
                        },
                        token: jwt,
                    });
                }
            }
        } else {
            res.status(400).json({
                message: "Registration is currently disabled",
            });
        }
    }
});

app.post("/login", (req, res) => {
    new Promise(async (resolve, reject) => {
        let validated = Validator.LoginUser.validate(req.body);
        if (validated.error) {
            // user input is not valid
            reject({
                message: "Login failed with errors",
                errors: validated.error.details.map((err) => ({ message: err.message, type: err.type })),
            });
        } else {
            let { email, password } = validated.value;
            let userDataFromEmail = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (userDataFromEmail !== null && userDataFromEmail !== undefined) {
                let { salt } = userDataFromEmail;
                let { hash } = hashPassword(password, salt);
                if (hash === userDataFromEmail.hash) {
                    let refreshToken = await RefreshToken.create({
                        name: req.get("user-agent"),
                        token: generateRefreshToken(userDataFromEmail),
                        userId: userDataFromEmail.id,
                    });
                    res.cookie(cookieName, refreshToken.token, {
                        httpOnly: true,
                        expires: dayjs().add(30, "days").toDate(),
                    });
                    let jwt = generateJWT(userDataFromEmail);
                    resolve({
                        message: "Login successful",
                        token: jwt,
                        user: {
                            username: userDataFromEmail.username,
                            id: userDataFromEmail.id,
                        },
                    });
                }
            }
            reject({
                message: "Login failed with errors",
                errors: ["Invalid email or password"],
            });
        }
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((data) => {
            res.status(400).json(data);
        });
});

module.exports = app;
