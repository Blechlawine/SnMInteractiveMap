const express = require('express');
const app = express();
const pins = require("./pins");
const categories = require("./categories");
const types = require("./types");
const auth = require("./auth");

app.use("/pins", pins);
app.use("/categories", categories);
app.use("/types", types);
app.use("/auth", auth); 

module.exports = app;

