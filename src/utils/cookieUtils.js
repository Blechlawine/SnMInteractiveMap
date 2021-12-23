function parseCookie(req) {
    let cookies = {};
    let cookieHeader = req.headers.cookie;
    if (cookieHeader == null) {
        return false;
    }
    cookieHeader.split(";").forEach((cookie) => {
        let parts = cookie.split("=");
        cookies[parts.shift().trim()] = decodeURI(parts.join("="));
    });
    return cookies;
}

module.exports = { parseCookie };
