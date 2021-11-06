const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();

const app = express();

const PORT = process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 9000;

app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

app.use("/", express.static("./client/dist"));

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});