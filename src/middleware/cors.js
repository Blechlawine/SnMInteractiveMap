module.exports = (req, res, next) => {
    res.set(
        "Access-Control-Allow-Origin",
        process.env.NODE_ENV === "production" ? "https://snminteractivemap.herokuapp.com/" : "http://localhost:8080"
    );
    return next();
};