const User = require("../model/Users");

class AuthRepository {
    async findByEmail(email) {

        return User.findOne({
            email: email.toLowerCase(),
        })
            .select("+password +refreshTokens.token")
            .populate("branchId");

    }

    /**
     * ============================================================
     * Find by ID
     * ============================================================
     */
    async findById(id) {

        return User.findById(id)
            .populate("branchId");

    }

    /**
     * ============================================================
     * Find user including password
     * ============================================================
     */
    async findByIdWithPassword(id) {

        return User.findById(id)
            .select("+password +refreshTokens.token")
            .populate("branchId");

    }

    /**
     * ============================================================
     * Find user by refresh token
     * ============================================================
     */
    async findByRefreshToken(refreshToken) {

        return User.findOne({
            "refreshTokens.token": refreshToken,
        }).select("+refreshTokens.token");

    }

    /**
     * ============================================================
     * Save refresh token
     * ============================================================
     */
    async addRefreshToken(
        userId,
        refreshTokenData
    ) {

        return User.findByIdAndUpdate(

            userId,

            {
                $push: {
                    refreshTokens: refreshTokenData,
                },
            },

            {
                new: true,
            }

        );

    }

    /**
     * ============================================================
     * Remove one refresh token
     * ============================================================
     */
    async removeRefreshToken(
        userId,
        refreshToken
    ) {

        return User.findByIdAndUpdate(

            userId,

            {
                $pull: {
                    refreshTokens: {
                        token: refreshToken,
                    },
                },
            },

            {
                new: true,
            }

        );

    }

    /**
     * ============================================================
     * Remove all refresh tokens
     * ============================================================
     */
    async removeAllRefreshTokens(
        userId
    ) {

        return User.findByIdAndUpdate(

            userId,

            {
                $set: {
                    refreshTokens: [],
                },
            },

            {
                new: true,
            }

        );

    }

    /**
     * ============================================================
     * Update last login
     * ============================================================
     */
    async updateLastLogin(
        userId,
        ip,
        userAgent
    ) {

        return User.findByIdAndUpdate(

            userId,

            {

                lastLogin: new Date(),

                lastLoginIp: ip,

                lastLoginDevice: userAgent,

            },

            {
                new: true,
            }

        );

    }

}

module.exports =
    new AuthRepository();