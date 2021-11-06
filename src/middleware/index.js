const express = require("express");
const app = express();

app.use(require("./cors"));

module.exports = app;