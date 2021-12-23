const jwt = require("jsonwebtoken");

function generateJWT(user) {
    let token = jwt.sign(
        {
            usr: {
                id: user.id,
                username: user.username,
            },
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15min",
        }
    );
    return token;
}

function generateRefreshToken(user) {
    return jwt.sign(
        {
            userId: user.id,
        },
        process.env.JWT_REFRESH_SECRET
    );
}

module.exports = { generateJWT, generateRefreshToken };
