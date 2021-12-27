const express = require("express");
const app = express();

const { isAuthenticated } = require("./auth");

app.use(require("./cors"));
app.use(isAuthenticated);

module.exports = app;
