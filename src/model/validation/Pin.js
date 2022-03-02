const Joi = require("joi");

const SubmitPin = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().max(300),
    area: Joi.string().required().valid("Azura", "Farmlands"),
    x: Joi.number().required(),
    y: Joi.number().required(),
    imageUrl: Joi.string().min(10).label("image-url"),
    type: Joi.object({
        id: Joi.string(),
        new: Joi.boolean(),
        title: Joi.string().min(3).max(100),
        category: Joi.object({
            id: Joi.string(),
            new: Joi.boolean(),
            title: Joi.string().min(3).max(100),
        })
            .required()
            .xor("id", "new")
            .and("new", "title"),
    })
        .required()
        .xor("id", "new")
        .and("new", "title"),
});

module.exports = { SubmitPin };
