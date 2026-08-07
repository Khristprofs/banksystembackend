const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRepository = require("../repository/authRepository");
const generateToken = require("../helpers/generateToken");

class AuthService {

    async login({
        email,
        password,
        ipAddress,
        userAgent
    }) {
        console.log("========== LOGIN DEBUG ==========");
        console.log("LOGIN EMAIL:", email);

        const user =
            await authRepository.findByEmail(email);

        console.log("USER FOUND:", !!user);

        if (user) {
            console.log(
                "USER ID:",
                user._id.toString()
            );

            console.log(
                "USER EMAIL:",
                user.email
            );

            console.log(
                "USER ROLE:",
                user.role
            );

            console.log(
                "USER STATUS:",
                user.status
            );

            console.log(
                "EMAIL VERIFIED:",
                user.isEmailVerified
            );

            console.log(
                "PASSWORD EXISTS:",
                !!user.password
            );

            console.log(
                "PASSWORD LENGTH:",
                user.password?.length
            );
        }

        if (!user) {
            throw new Error(
                "Invalid email or password."
            );
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        console.log(
            "PASSWORD MATCH:",
            isMatch
        );

        if (!isMatch) {
            throw new Error(
                "Invalid email or password."
            );
        }

        if (user.status !== "active") {
            throw new Error(
                `Account is ${user.status}.`
            );
        }

        if (!user.isEmailVerified) {
            throw new Error(
                "Please verify your email first."
            );
        }

        const {
            accessToken,
            refreshToken
        } = generateToken(user);

        await authRepository.addRefreshToken(
            user._id,
            {
                token: refreshToken,
                ipAddress,
                userAgent,
                device: userAgent,
                expiresAt: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                )
            }
        );

        user.password = undefined;
        user.refreshTokens = undefined;

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    /**
     * ============================================================
     * LOGOUT
     * ============================================================
     */
    async logout(refreshToken) {

        const user =
            await authRepository.findByRefreshToken(
                refreshToken
            );

        if (!user) {

            return true;

        }

        await authRepository.removeRefreshToken(
            user._id,
            refreshToken
        );

        return true;

    }

    /**
     * ============================================================
     * REFRESH TOKEN
     * ============================================================
     */
    async refresh(refreshToken) {

        const user =
            await authRepository.findByRefreshToken(
                refreshToken
            );

        if (!user) {

            throw new Error(
                "Invalid refresh token."
            );

        }

        jwt.verify(

            refreshToken,

            process.env.JWT_REFRESH_SECRET

        );

        // Remove old refresh token

        await authRepository.removeRefreshToken(

            user._id,

            refreshToken

        );

        // Generate new tokens

        const {

            token,

            refreshToken: newRefreshToken

        } = generateToken(user);

        // Save new refresh token

        await authRepository.addRefreshToken(

            user._id,

            {

                token: newRefreshToken,

                expiresAt: new Date(
                    Date.now() +
                    7 * 24 * 60 * 60 * 1000
                )

            }

        );

        return {

            accessToken: token,

            refreshToken: newRefreshToken

        };

    }

    /**
     * ============================================================
     * CURRENT USER
     * ============================================================
     */
    async me(userId) {

        const user =
            await authRepository.findById(userId);

        if (!user) {

            throw new Error(
                "User not found."
            );

        }

        return user;

    }

}

module.exports = new AuthService();