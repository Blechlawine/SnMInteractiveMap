const Joi = require("joi");

const RegisterUser = Joi.object({
    email: Joi.string().required().email({ minDomainSegments: 2 }),
    username: Joi.string().required().alphanum().min(3).max(30),
    password: Joi.string().required(),
    passwordRepeat: Joi.ref("password"),
    referenceCode: Joi.string().required(),
}).with("password", "passwordRepeat");

const LoginUser = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().required(),
});

module.exports = { RegisterUser, LoginUser };
