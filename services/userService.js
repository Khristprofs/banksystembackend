const userRepository = require("../repository/userRepository");
const Branch = require("../model/Branch");
const { hashPassword } = require("../utils/passwordUtils");

exports.createUser = async (data) => {
  if (data.role !== "admin") {
    if (!data.branchId) {
      throw new Error("Branch is required");
    }

    const branch = await Branch.findById(data.branchId);

    if (!branch) {
      throw new Error("Branch not found");
    }
  }

  const existingUser = await userRepository.findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  data.password = await hashPassword(data.password);

  return await userRepository.createUser(data);
};

exports.getUsers = async (query) => {
  return await userRepository.findUsers(query);
};

exports.getUserById = async (id) => {
  return await userRepository.findUserById(id);
};

exports.updateUser = async (id, data) => {
  if (data.branchId) {
    const branch = await Branch.findById(data.branchId);

    if (!branch) {
      throw new Error("Branch not found");
    }
  }

  if (data.password && data.password.trim() !== "") {
    data.password = await hashPassword(data.password);
  } else {
    delete data.password;
  }

  return await userRepository.updateUser(id, data);
};

exports.deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};