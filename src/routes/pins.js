const express = require("express");
const app = express();
const { rejectUnauthenticated } = require("../middleware/auth");
const { CreatePin, CreateDraftPin, AdministratePin } = require("../model/validation/Pin");

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
            status: "public",
        },
    });
    res.status(200).json({
        data: {
            pins,
        },
    });
});

app.post("/create", rejectUnauthenticated, async (req, res) => {
    let validated = CreatePin.validate(req.body);
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
            message: "Pin successfully created",
            data: {
                pin: created,
            },
        });
    }
});

app.get("/all", rejectUnauthenticated, async (req, res) => {
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

app.post("/edit", rejectUnauthenticated, async (req, res) => {
    let validated = AdministratePin.validate(req.body);
    if (validated.error) {
        res.status(400).json({
            message: "Request failed with errors",
            errors: validated.error.details.map((err) => ({ message: err.message, type: err.type })),
        });
    } else {
        let updated = await Pin.update(
            {
                ...validated.value,
            },
            {
                where: {
                    id: validated.value.id,
                },
            }
        );
        res.status(200).json({
            message: "Pin successfully updated",
            data: {
                pin: updated,
            },
        });
    }
});

module.exports = app;
