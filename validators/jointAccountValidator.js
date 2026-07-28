const Joi = require("joi");

exports.createJointAccountSchema = Joi.object({
    accountId: Joi.string().required(),
    createdBy: Joi.string().required(),
    users: Joi.array()
        .items(
            Joi.object({
                userId: Joi.string().required(),
                role: Joi.string().valid("admin", "member").default("member"),
            })
        )
        .min(2)
        .required(),

    jointType: Joi.string()
        .valid("two_to_sign", "admin_plus_one")
        .required(),

    name: Joi.string().max(100)

});


exports.updateJointAccountSchema = Joi.object({

    name: Joi.string().max(100),

    status: Joi.string()
        .valid("active", "inactive", "suspended")

}).min(1);