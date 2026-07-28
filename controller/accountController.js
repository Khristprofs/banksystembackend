const accountService = require("../services/accountService");
const response = require("../helpers/responseHelper");

exports.createAccount = async (req, res) => {
    try {
        const account = await accountService.createAccount(req.body);
        response.success(res, account, "Account created", 201);

    } catch (err) {
        response.error(res, err.message);
    }
};

exports.getAccounts = async (req, res) => {
    try {
        const data = await accountService.getAccounts();
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.getAccountByNumber = async (req, res) => {
    try {
        const data = await accountService.getAccountByNumber(req.params.number);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.getAccountsByBranch = async (req, res) => {
    try {
        const data = await accountService.getAccountsByBranch(req.params.branchId);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.getAccountsByUser = async (req, res) => {
    try {
        const data = await accountService.getAccountsByUser(req.params.userId);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.getChildAccountsByParent = async (req, res) => {
    try {
        const data = await accountService.getChildAccountsByParent(req.params.parentId);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.getAccountsByType = async (req, res) => {
    try {
        const data = await accountService.getAccountsByType(req.params.type);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.getAccountsByCurrency = async (req, res) => {
    try {
        const data = await accountService.getAccountsByCurrency(req.params.currency);
        response.success(res, data);
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const data = await accountService.updateAccount(req.params.id, req.body);
        response.success(res, data, "Account updated");
    } catch (err) {
        response.error(res, err.message);
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        await accountService.deleteAccount(req.params.id);
        response.success(res, null, "Account deleted");
    } catch (err) {
        response.error(res, err.message);
    }
};