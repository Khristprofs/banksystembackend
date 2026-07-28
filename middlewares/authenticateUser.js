const jwt = require("jsonwebtoken");
const User = require("../model/Users");

const authenticate = async (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization ||
            req.headers.Authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({
                success: false,
                message: "Access token required."
            });

        }

        const token =
            authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(
            decoded.id || decoded.sub
        )
            .populate("branchId")
            .select("-password");

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User not found."

            });

        }

        if (user.status !== "active") {

            return res.status(403).json({

                success: false,

                message: `Account is ${user.status}.`

            });

        }

        /**
         * Password changed after token issued?
         */

        if (user.passwordChangedAt) {

            const changedTime =
                parseInt(
                    user.passwordChangedAt.getTime() / 1000,
                    10
                );

            if (
                decoded.iat < changedTime
            ) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Password recently changed. Please login again."

                });

            }

        }

        req.user = {

            id: user._id,

            email: user.email,

            role: user.role,

            branchId: user.branchId,

        };

        req.roles = [user.role];

        next();

    } catch (err) {

        if (err.name === "TokenExpiredError") {

            return res.status(401).json({

                success: false,

                message: "Access token expired."

            });

        }

        if (err.name === "JsonWebTokenError") {

            return res.status(401).json({

                success: false,

                message: "Invalid access token."

            });

        }

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = authenticate;