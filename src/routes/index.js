const express = require('express');
const app = express();
const pins = require("./pins");
const categories = require("./categories");

app.use("/pins", pins);
app.use("/categories", categories);

module.exports = app;

