module.exports = (req, res, next) => {

    const { accountSubType, parentUserId } = req.body;

    if (accountSubType === "child" && !parentUserId) {

        return res.status(400).json({
            message: "Child account must have parent"
        });

    }

    next();

};