const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const middleware = require("./middleware");

const sequelize = require("./utils/databaseUtils");

require("dotenv").config();
const app = express();
const isProduction = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || isProduction ? 80 : 9000;

app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

app.use(middleware);
app.use("/api", routes);
app.get("/", (req, res) => {
    res.redirect("/app/");
});
app.use("/app/*", express.static("./client/dist"));

// database setup
sequelize
    .sync()
    .then(() => {
        console.log("Connected to database successfully!");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to database: ", err);
    });
