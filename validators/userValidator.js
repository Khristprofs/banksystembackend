const Joi = require("joi");

exports.createUserSchema = Joi.object({
  role: Joi.string()
    .valid("bank_admin", "staff", "customer", "admin", "customer_service")
    .required(),

  branchId: Joi.when("role", {
    is: "admin",
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),

  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

exports.updateUserSchema = Joi.object({
  branchId: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string().min(6),
  role: Joi.string().valid(
    "bank_admin",
    "staff",
    "customer",
    "admin",
    "customer_service"
  ),
  status: Joi.string().valid(
    "active",
    "inactive",
    "suspended",
    "blocked"
  ),
});