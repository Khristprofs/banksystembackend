const Joi = require("joi");

exports.createCardSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),

    accountId: Joi.string().hex().length(24).required(),

    branchId: Joi.string().hex().length(24).required(),

    pin: Joi.string()
        .pattern(/^\d{4}$/)
        .required()
        .messages({
            "string.pattern.base": "PIN must be exactly 4 digits.",
        }),

    cardType: Joi.string()
        .valid("debit", "credit", "virtual")
        .required(),

    cardNetwork: Joi.string()
        .valid("visa", "mastercard", "verve")
        .required(),

    cardHolderName: Joi.string().min(3).max(100).required(),

    currency: Joi.string().default("NGN"),
});

exports.updateCardSchema = Joi.object({
    status: Joi.string().valid(
        "active",
        "inactive",
        "blocked",
        "expired",
        "lost",
        "stolen"
    ),

    isFrozen: Joi.boolean(),

    isActive: Joi.boolean(),

    cardHolderName: Joi.string().min(3).max(100),

    currency: Joi.string(),

    limits: Joi.object({
        dailyWithdrawalLimit: Joi.number(),

        dailyPurchaseLimit: Joi.number(),

        perTransactionLimit: Joi.number(),
    }),

    channels: Joi.object({
        atm: Joi.boolean(),

        pos: Joi.boolean(),

        web: Joi.boolean(),

        international: Joi.boolean(),
    }),

    metadata: Joi.object(),
}).min(1);