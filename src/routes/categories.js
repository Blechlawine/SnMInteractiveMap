const express = require("express");
const { rejectUnauthenticated } = require("../middleware/auth");
const app = express();

const { Type, Category, Pin } = require("../model");

app.get("/details/:id", (req, res) => {
    // TODO: get category details
});

app.get("/", async (req, res) => {
    let categories = await Category.findAll({
        where: {
            deletedAt: null,
            status: "published",
        },
    });
    res.status(200).json({
        data: {
            categories,
        },
    });
});

app.get("/all", rejectUnauthenticated, async (req, res) => {
    let categories = await Category.findAll({
        where: {
            deletedAt: null,
        },
    });
    res.status(200).json({
        data: {
            categories,
        },
    });
});

module.exports = app;
