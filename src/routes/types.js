const express = require("express");
const app = express();

const { Type, Category } = require("../model");

app.get("/:id", async (req, res) => {
    let { id } = req.params;
    let pin = await Type.findByPk(id, {
        include: Category,
    });
    res.status(200).json({
        data: {
            pin,
        },
    });
});

app.get("/", async (req, res) => {
    let types = await Type.findAll({
        where: {
            deletedAt: null,
        },
    });
    res.status(200).json({
        data: {
            types,
        },
    });
});

module.exports = app;
