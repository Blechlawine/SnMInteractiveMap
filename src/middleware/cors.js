module.exports = (req, res, next) => {
    res.set(
        "Access-Control-Allow-Origin",
        process.env.NODE_ENV === "production" ? "https://snminteractivemap.herokuapp.com/" : "http://localhost:8080"
    );
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Access-Control-Allow-Headers", "content-type, authorization");
    return next();
};