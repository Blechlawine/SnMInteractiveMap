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

module.exports = app;
