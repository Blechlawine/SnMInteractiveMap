const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const middleware = require("./middleware");
const path = require("path");

const sequelize = require("./utils/databaseUtils");

require("dotenv").config();
const app = express();
const isProduction = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 9000;
const CLIENT = path.resolve(__dirname, "../client/dist");

app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

app.use(middleware);
// Serves the vue frontend on "/"
app.use("/", express.static(CLIENT));

app.get(/^\/(?!api).*$/, (req, res) => { // this regex matches every route except everything that starts with /api
    res.sendFile(path.resolve(CLIENT, "index.html"));
});
// api routes
app.use("/api", routes);

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
