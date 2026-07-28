const authorize = (...allowedRoles) => {

    return (req, res, next) => {

        // User must already be authenticated
        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });

        }

        const { role } = req.user;

        if (!allowedRoles.includes(role)) {

            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action."
            });

        }

        next();

    };

};

module.exports = authorize;