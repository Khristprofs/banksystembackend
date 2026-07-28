const service = require("../services/jointAccountService");
const response = require("../helpers/responseHelper");

exports.createJointAccount = async (req, res) => {
    try {

        const data = await service.createJointAccount(req.body);

        response.success(
            res,
            data,
            "Joint account created",
            201
        );

    } catch (err) {

        response.error(res, err.message);
    }
};

exports.getAllJointAccounts = async (req, res) => {

    try {

        const data =
            await service.getAllJointAccounts();

        response.success(res, data);

    } catch (err) {

        response.error(res, err.message);
    }
};

exports.getJointAccountById = async (req, res) => {

    try {

        const data =
            await service.getJointAccountById(req.params.id);

        response.success(res, data);

    } catch (err) {

        response.error(res, err.message);
    }
};

exports.updateJointAccount = async (req, res) => {

    try {

        const data =
            await service.updateJointAccount(
                req.params.id,
                req.body
            );

        response.success(
            res,
            data,
            "Joint account updated"
        );

    } catch (err) {

        response.error(res, err.message);
    }
};

exports.deleteJointAccount = async (req, res) => {

    try {

        await service.deleteJointAccount(req.params.id);

        response.success(
            res,
            null,
            "Joint account deleted"
        );

    } catch (err) {

        response.error(res, err.message);
    }
};