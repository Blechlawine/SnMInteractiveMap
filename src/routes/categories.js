const express = require("express");
const app = express();

const { Type, Category, Pin } = require("../model");

app.get("/:id", (req, res) => {

});

app.get("/", async (req, res) => {
    let categories = await Category.findAll({
        where: {
            deletedAt: null
        },
    });
    res.status(200).json({
        data: {
            categories,
        },
    });
});

module.exports = app;
