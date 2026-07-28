const userService = require("../services/userService");
const response = require("../helpers/responseHelper");

exports.createUser = async (req, res) => {

    try {

        const user = await userService.createUser(req.body);

        response.success(res, user, "User created successfully", 201);

    } catch (error) {

        response.error(res, error.message);

    }
};


exports.getUsers = async (req, res) => {

    try {

        const users = await userService.getUsers();

        response.success(res, users);

    } catch (error) {

        response.error(res, error.message);

    }
};


exports.getUserById = async (req, res) => {

    try {

        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return response.error(res, "User not found", 404);
        }

        response.success(res, user);

    } catch (error) {

        response.error(res, error.message);

    }
};


exports.updateUser = async (req, res) => {

    try {

        const user = await userService.updateUser(req.params.id, req.body);

        if (!user) {
            return response.error(res, "User not found", 404);
        }

        response.success(res, user, "User updated");

    } catch (error) {

        response.error(res, error.message);

    }
};


exports.deleteUser = async (req, res) => {

    try {

        const user = await userService.deleteUser(req.params.id);

        if (!user) {
            return response.error(res, "User not found", 404);
        }

        response.success(res, null, "User deleted");

    } catch (error) {

        response.error(res, error.message);

    }
};