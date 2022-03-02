const jwt = require("jsonwebtoken");
const { User } = require("../model");
const { parseCookie } = require("../utils").cookie;

const cookieName = "snmInteractiveMapToken";

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
        const cookies = parseCookie(req);
        if (cookies && cookies[cookieName]) {
            const decoded = jwt.verify(cookies[cookieName], process.env.JWT_REFRESH_SECRET);
            if (decoded) {
                res.status(403).json({
                    message: "Refresh your tokens, then try again",
                });
                return;
            }
        }
        res.status(401).json({
            message: "Authenticate first",
        });
    } else {
        return next();
    }
}

module.exports = { isAuthenticated, rejectUnauthenticated };
