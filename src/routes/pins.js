const express = require("express");
const app = express();

const { Pin, Type } = require("../model");

app.get("/:id", async (req, res) => {
    let { id } = req.params;
    let pin = await Pin.findByPk(id, {
        include: Type,
    });
    res.status(200).json({
        data: {
            pin,
        },
    });
});

app.get("/", async (req, res) => {
    let pins = await Pin.findAll({
        where: {
            deletedAt: null,
        },
    });
    res.status(200).json({
        data: {
            pins,
        },
    });
});

module.exports = app;
