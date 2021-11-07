const express = require('express');
const app = express();
const pins = require("./pins");
const categories = require("./categories");
const types = require("./types");

app.use("/pins", pins);
app.use("/categories", categories);
app.use("/types", types);

module.exports = app;

