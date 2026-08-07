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
        console.log(
            "DATABASE:",
            mongoose.connection.name
        );

        console.log(
            "DATABASE HOST:",
            mongoose.connection.host
        );
        console.log("SERVICE EMAIL:", email);

        // Find user
        const user =
            await authRepository.findByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password.");
        }

        // Verify password
        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            throw new Error("Invalid email or password.");
        }

        // Verify account status
        if (user.status !== "active") {
            throw new Error(
                `Account is ${user.status}.`
            );
        }

        // Verify email
        if (!user.isEmailVerified) {
            throw new Error(
                "Please verify your email first."
            );
        }

        // Generate Tokens
        const {
            accessToken,
            refreshToken
        } = generateToken(user);


        // Save refresh token
        await authRepository.addRefreshToken(
            user._id,
            {
                token: refreshToken,
                ipAddress,
                userAgent,
                device: userAgent,
                expiresAt: new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                )
            }
        );


        // Remove sensitive fields
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