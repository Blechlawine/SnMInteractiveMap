module.exports = (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    return next();
};