const userService = require("../services/userService");
const response = require("../helpers/responseHelper");

/**
 * Create User
 */
exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    response.success(
      res,
      user,
      "User created successfully",
      201
    );
  } catch (error) {
    response.error(res, error.message);
  }
};

/**
 * Get All Users
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(req.query);

    response.success(res, users);
  } catch (error) {
    response.error(res, error.message);
  }
};

/**
 * Get User By ID
 */
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

/**
 * Update User
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    if (!user) {
      return response.error(res, "User not found", 404);
    }

    response.success(
      res,
      user,
      "User updated successfully"
    );
  } catch (error) {
    response.error(res, error.message);
  }
};

/**
 * Change User Role
 */
exports.changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return response.error(
        res,
        "Role is required",
        400
      );
    }

    const user = await userService.updateUser(
      req.params.id,
      { role }
    );

    if (!user) {
      return response.error(res, "User not found", 404);
    }

    response.success(
      res,
      user,
      "Role updated successfully"
    );
  } catch (error) {
    response.error(res, error.message);
  }
};

/**
 * Change User Status
 */
exports.changeUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return response.error(
        res,
        "Status is required",
        400
      );
    }

    const user = await userService.updateUser(
      req.params.id,
      { status }
    );

    if (!user) {
      return response.error(res, "User not found", 404);
    }

    response.success(
      res,
      user,
      "Status updated successfully"
    );
  } catch (error) {
    response.error(res, error.message);
  }
};

/**
 * Delete User
 */
exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
      return response.error(res, "User not found", 404);
    }

    response.success(
      res,
      null,
      "User deleted successfully"
    );
  } catch (error) {
    response.error(res, error.message);
  }
};