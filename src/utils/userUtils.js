const crypto = require("crypto");

function genSalt() {
    return crypto.randomBytes(32).toString("hex");
}

function hashPassword(password, saltIn) {
    let salt = saltIn || genSalt();
    let hash = crypto.scryptSync(password, salt, 32).toString("hex");
    return { hash, salt };
}

module.exports = {hashPassword};