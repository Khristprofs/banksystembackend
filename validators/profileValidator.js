const Joi = require("joi");

exports.createProfileSchema = Joi.object({
  userId: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().allow(""),
  bio: Joi.string().max(500),
  profileImg: Joi.string(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("male","female","other"),
  address: Joi.object({
    street: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string()
  }),

  kyc: Joi.object({
    bvn: Joi.string().pattern(/^\d{11}$/).required(),
    nin: Joi.string().pattern(/^\d{11}$/).required()
  }),

  nextOfKin: Joi.object({
    name: Joi.string(),
    relationship: Joi.string(),
    phoneNumber: Joi.string()
  }),

  isPoliticallyExposed: Joi.boolean()

});