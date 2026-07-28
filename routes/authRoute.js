const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");

const authenticate = require("../middlewares/authenticateUser");
const authorize = require("../middlewares/authorize");
const validate = require("../middlewares/validate");

const ROLES_LIST = require("../helpers/roleList");

const {
    loginSchema,
    changePasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} = require("../validators/authValidator");

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

router.post(
    "/refresh-token",
    authController.refreshToken
);

// router.post(
//     "/forgot-password",
//     validate(forgotPasswordSchema),
//     authController.forgotPassword
// );

// router.post(
//     "/reset-password",
//     validate(resetPasswordSchema),
//     authController.resetPassword
// );

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
    "/logout",
    authenticate,
    authController.logout
);

router.get(
    "/me",
    authenticate,
    authController.me
);

// router.patch(
//     "/change-password",
//     authenticate,
//     validate(changePasswordSchema),
//     authController.changePassword
// );

/*
|--------------------------------------------------------------------------
| Admin Only
|--------------------------------------------------------------------------
*/

// router.get(
//     "/sessions",
//     authenticate,
//     authorize(ROLES_LIST.ADMIN),
//     authController.getActiveSessions
// );

// router.delete(
//     "/sessions/:userId",
//     authenticate,
//     authorize(ROLES_LIST.ADMIN),
//     authController.forceLogoutUser
// );

module.exports = router;