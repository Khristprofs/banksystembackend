const Joi = require("joi");

const currencies = [
    "NGN",
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CNY",
    "AUD",
    "CAD",
    "BRL",
    "INR"
];


exports.createAccountSchema = Joi.object({

    userId: Joi.string().required(),
    branchId: Joi.string().required(),
    accountType: Joi.string()
        .valid("savings", "current", "fixed_deposit", "business")
        .required(),

    accountSubType: Joi.string()
        .valid("student", "personal", "child", "salary"),

    parentUserId: Joi.string().allow(null),
    currency: Joi.string()
        .valid(...currencies)
        .default("NGN"),

    balance: Joi.number()
        .min(0)
        .default(0),

    accountTier: Joi.string()
        .valid("tier1", "tier2", "tier3")
        .default("tier1")

});

exports.updateAccountSchema = Joi.object({

    accountType: Joi.string()
        .valid("savings", "current", "fixed_deposit", "business"),

    accountSubType: Joi.string()
        .valid("student", "personal", "child", "salary"),

    parentUserId: Joi.string().allow(null),

    currency: Joi.string()
        .valid(...currencies),

    status: Joi.string()
        .valid("active", "frozen", "closed", "suspended"),

    accountTier: Joi.string()
        .valid("tier1", "tier2", "tier3"),

    isActive: Joi.boolean(),

    freezeReason: Joi.string().max(300),

    limits: Joi.object({
        dailyTransactionLimit: Joi.number().min(0),
        dailyWithdrawalLimit: Joi.number().min(0),
        maxBalance: Joi.number().min(0)
    }),

    childSettings: Joi.object({
        canDeposit: Joi.boolean(),
        canWithdraw: Joi.boolean(),
        canTransfer: Joi.boolean(),
        requiresParentApproval: Joi.boolean()
    })

}).min(1); 