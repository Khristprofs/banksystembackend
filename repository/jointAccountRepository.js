const JointAccount = require("../model/JointAccount");

exports.create = (data) =>
    JointAccount.create(data);

exports.findByAccountId = (accountId) =>
    JointAccount.findOne({ accountId });

exports.findUserInAnyJointAccount = (userId) =>
    JointAccount.findOne({
        "users.userId": userId
    });

exports.findAll = () =>
    JointAccount.find()
        .populate("users.userId accountId");

exports.findById = (id) =>
    JointAccount.findById(id)
        .populate("users.userId accountId");

exports.update = (id, data) =>
    JointAccount.findByIdAndUpdate(id, data, { new: true });

exports.delete = (id) =>
    JointAccount.findByIdAndDelete(id);