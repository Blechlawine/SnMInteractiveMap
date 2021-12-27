const jwt = require("jsonwebtoken");
const { User } = require("../model");

async function isAuthenticated(req, res, next) {
    const auth = (req.headers && req.headers.authorization) || "";
    const token = auth.replace("Bearer:", "").trim();
    res.locals.token = token;
    let decoded, user;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findByPk(decoded.usr.id);
    } catch (err) {
        res.locals.authenticated = false;
        return next();
    }
    if (user == undefined) {
        res.locals.authenticated = false;
        return next();
    }
    res.locals.authenticated = true;
    res.locals.decoded = decoded;
    res.locals.user = user;
    return next();
}

function rejectUnauthenticated(req, res, next) {
    if (!res.locals.authenticated || res.locals.user == undefined) {
        res.status(401).json({
            message: "Authenticate first",
        });
    } else {
        return next();
    }
}

module.exports = { isAuthenticated, rejectUnauthenticated };
