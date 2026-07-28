const Joi = require("joi");

exports.updateNotificationSchema = Joi.object({

    isRead: Joi.boolean(),

    isArchived: Joi.boolean(),

}).min(1);