const authService = require("../services/authService");
const response = require("../helpers/responseHelper");

class AuthController {

    async login(req, res) {
        console.log("LOGIN BODY:", req.body);

        try {

            const {

                user,

                accessToken,

                refreshToken

            } = await authService.login({

                email: req.body.email,

                password: req.body.password,

                ipAddress: req.ip,

                userAgent: req.get("user-agent"),

            });

            res.cookie(

                "refreshToken",

                refreshToken,

                {

                    httpOnly: true,

                    secure: process.env.NODE_ENV === "production",

                    sameSite: "strict",

                    maxAge:
                        7 *
                        24 *
                        60 *
                        60 *
                        1000,

                }

            );

            return response.success(

                res,

                {

                    user,

                    accessToken,

                },

                "Login successful."

            );

        } catch (err) {

            return response.error(

                res,

                err.message,

                err.statusCode || 401

            );

        }

    }

    async logout(req, res) {

        try {

            const refreshToken =
                req.cookies?.refreshToken;

            if (!refreshToken) {

                return response.success(

                    res,

                    null,

                    "Already logged out."

                );

            }

            await authService.logout(
                refreshToken
            );

            res.clearCookie(

                "refreshToken",

                {

                    httpOnly: true,

                    secure:
                        process.env.NODE_ENV ===
                        "production",

                    sameSite: "strict",

                }

            );

            return response.success(

                res,

                null,

                "Logout successful."

            );

        } catch (err) {

            return response.error(

                res,

                err.message,

                err.statusCode || 400

            );

        }

    }

    async refreshToken(req, res) {

        try {

            const refreshToken = req.cookies?.refreshToken;
            if (!refreshToken) {
                return response.error(
                    res,
                    "Refresh token missing.",
                    401
                );

            }
            const {
                accessToken,

                refreshToken: newRefreshToken,

            } = await authService.refresh(
                refreshToken
            );

            res.cookie(

                "refreshToken",

                newRefreshToken,

                {

                    httpOnly: true,

                    secure:
                        process.env.NODE_ENV ===
                        "production",

                    sameSite: "strict",

                    maxAge:
                        7 *
                        24 *
                        60 *
                        60 *
                        1000,

                }

            );

            return response.success(

                res,

                {

                    accessToken,

                },

                "Token refreshed."

            );

        } catch (err) {

            return response.error(

                res,

                err.message,

                err.statusCode || 401

            );

        }

    }

    async me(req, res) {

        try {

            const user =
                await authService.me(
                    req.user.id
                );

            return response.success(

                res,

                user,

                "Authenticated user."

            );

        } catch (err) {

            return response.error(

                res,

                err.message,

                err.statusCode || 404

            );

        }

    }

}

module.exports = new AuthController();