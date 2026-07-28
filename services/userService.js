const userRepository = require("../repository/userRepository");
const Branch = require("../model/Branch");
const { hashPassword } = require("../utils/passwordUtils");

exports.createUser = async (data) => {
    const branch = await Branch.findById(data.branchId);
    if (!branch) {
        throw new Error("Branch does not exist");
    }
    const existingUser = await userRepository.findUserByEmailAndBank(
        data.email,
        branch.bankId
    );

    if (existingUser) {
        throw new Error(
            "User already exists in another branch of this bank"
        );
    }
    data.password = await hashPassword(data.password);
    return await userRepository.createUser(data);
};


exports.getUsers = async () => {
    return await userRepository.findUsers();
};


exports.getUserById = async (id) => {
    return await userRepository.findUserById(id);
};


exports.updateUser = async (id, data) => {
    if (data.password) {
        data.password = await hashPassword(data.password);
    }
    if (data.branchId) {
        const branch = await Branch.findById(data.branchId);
        if (!branch) {
            throw new Error("Branch does not exist");
        }
    }

    return await userRepository.updateUser(id, data);
};


exports.deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
};