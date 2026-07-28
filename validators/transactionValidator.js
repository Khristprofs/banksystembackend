const Joi = require("joi");

exports.depositSchema = Joi.object({

    accountNumber: Joi.string()
        .length(10)
        .required(),

    amount: Joi.number()
        .positive()
        .required(),

    transactionMode: Joi.string()
        .default("cash"),

    description: Joi.string()
        .allow("", null),

    channel: Joi.string()
        .valid("web", "mobile", "api", "atm", "pos")
        .default("api"),

});

exports.transferSchema = Joi.object({

    fromAccountNumber: Joi.string()
        .length(10)
        .required(),

    toAccountNumber: Joi.string()
        .length(10)
        .required(),

    amount: Joi.number()
        .positive()
        .required(),

    description: Joi.string()
        .allow("", null),

    channel: Joi.string()
        .valid("web", "mobile", "api", "atm", "pos")
        .default("api"),

});

exports.transferSchema = Joi.object({

    fromAccountNumber: Joi.string()
        .length(10)
        .required(),

    toAccountNumber: Joi.string()
        .length(10)
        .required(),

    amount: Joi.number()
        .positive()
        .required(),

    description: Joi.string()
        .allow("", null),

    channel: Joi.string()
        .valid(
            "web",
            "mobile",
            "api",
            "atm",
            "pos"
        )
        .default("api"),

});

exports.updateTransactionSchema = Joi.object({

    status: Joi.string().valid(
        "pending",
        "processing",
        "completed",
        "failed",
        "reversed"
    ),

    description: Joi.string(),

    metadata: Joi.object(),

}).min(1);