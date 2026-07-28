const User = require("../model/Users");
const Branch = require("../model/Branch")

exports.createUser = (data) => {
    return User.create(data);
};

exports.findUserByEmail = (email) => {
    return User.findOne({ email });
};

exports.findUserByPhone = (phone) => {
    return User.findOne({ phone });
};

exports.findUserById = (id) => {
    return User.findById(id).populate("branchId");
};
exports.findUserByEmailAndBank = async (email, bankId) => {
    const users = await User.find({ email }).populate("branchId");

    return users.find(
        user => user.branchId?.bankId?.toString() === bankId.toString()
    );
};

exports.findUsers = () => {
    return User.find().populate("branchId");
};

exports.updateUser = (id, data) => {
    return User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = (id) => {
    return User.findByIdAndDelete(id);
};