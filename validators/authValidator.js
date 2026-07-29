const Joi = require("joi");

/**
 * ============================================================
 * Login
 * ============================================================
 */
exports.loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            "string.email": "Please provide a valid email address.",
            "any.required": "Email is required."
        }),

    password: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters.",
            "any.required": "Password is required."
        })

});


/**
 * ============================================================
 * Change Password
 * ============================================================
 */
exports.changePasswordSchema = Joi.object({

    currentPassword: Joi.string()
        .required(),

    newPassword: Joi.string()
        .min(6)
        .max(100)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/
        )
        .required()
        .messages({

            "string.pattern.base":
                "Password must contain uppercase, lowercase, number and special character."

        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({

            "any.only":
                "Passwords do not match."

        })

});


/**
 * ============================================================
 * Forgot Password
 * ============================================================
 */
exports.forgotPasswordSchema = Joi.object({

    email: Joi.string()
        .email()
        .required()

});


/**
 * ============================================================
 * Reset Password
 * ============================================================
 */
exports.resetPasswordSchema = Joi.object({

    token: Joi.string()
        .required(),

    password: Joi.string()
        .min(6)
        .max(100)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/
        )
        .required(),

    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()

});


/**
 * ============================================================
 * Refresh Token
 * ============================================================
 */
exports.refreshTokenSchema = Joi.object({

    refreshToken: Joi.string()
        .required()

});


/**
 * ============================================================
 * Logout
 * ============================================================
 */
exports.logoutSchema = Joi.object({

    refreshToken: Joi.string()

});