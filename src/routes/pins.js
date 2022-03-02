const express = require("express");
const app = express();
const { rejectUnauthenticated } = require("../middleware/auth");
const { SubmitPin } = require("../model/validation/Pin");

const { Pin, Type } = require("../model");

app.get("/details/:id", async (req, res) => {
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
            status: "published",
        },
    });
    res.status(200).json({
        data: {
            pins,
        },
    });
});

app.post("/submit", async (req, res) => {
    let validated = SubmitPin.validate(req.body);
    if (validated.error) {
        res.status(400).json({
            message: "Request failed with errors",
            errors: validated.error.details.map((err) => ({ message: err.message, type: err.type })),
        });
    } else {
        let created = await Pin.create(
            {
                ...validated.value,
            },
            {
                nested: true,
                include: [
                    {
                        association: Pin.Type,
                        include: [Type.Category],
                    },
                ],
            }
        );
        res.status(200).json({
            message: "Pin successfully submitted",
            data: {
                pin: created,
            },
        });
    }
});

app.get("/submitted", rejectUnauthenticated, async (req, res) => {
    let pins = await Pin.findAll({
        where: {
            deletedAt: null,
            status: "submitted",
        },
    });
    res.status(200).json({
        data: {
            pins,
        },
    });
});

module.exports = app;
