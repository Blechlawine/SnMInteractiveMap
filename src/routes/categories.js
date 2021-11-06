const express = require("express");
const app = express();

const { Type, Category } = require("../model");

app.get("/:id", (req, res) => {

});

app.get("/", async (req, res) => {
    let categories = await Category.findAll({
        where: {
            deletedAt: null
        },
        include: [{
            model: Type,
        }],
    });
    res.status(200).json({
        data: {
            categories,
        },
    });
});

module.exports = app;
