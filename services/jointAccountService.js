const repository = require("../repository/jointAccountRepository");
const utils = require("../utils/jointAccountUtiles");
const helper = require("../helpers/jointAccountHelper");
const User = require("../model/Users");
const Account = require("../model/Account");

exports.createJointAccount = async (payload) => {

    const { accountId, createdBy, users, jointType, name } = payload;

    const account =
        await Account.findById(accountId);

    if (!account) {
        throw new Error("Account not found");
    }

    const existingJoint =
        await repository.findByAccountId(accountId);

    if (existingJoint) {
        throw new Error("This account is already a joint account");
    }

    const userIds =
        users.map(u => u.userId);

    const existingUsers =
        await User.find({
            _id: { $in: userIds }
        });

    if (existingUsers.length !== userIds.length) {
        throw new Error("One or more users do not exist");
    }

    const creator =
        await User.findById(createdBy);

    if (!creator) {
        throw new Error("Creator user not found");
    }

    const creatorExists =
        users.some(u =>
            u.userId.toString() === createdBy.toString()
        );

    if (!creatorExists) {
        throw new Error(
            "Creator must be part of joint account users"
        );
    }

    for (let user of users) {

        const existing =
            await repository.findUserInAnyJointAccount(
                user.userId
            );

        if (existing) {
            throw new Error(
                `User ${user.userId} already belongs to another joint account`
            );
        }
    }

    const assignedUsers = helper.assignRoles(users);

    const approvalRule =
        utils.calculateApprovalRule(
            jointType,
            assignedUsers
        );

    const jointAccount =
        await repository.create({

            accountId,
            createdBy,
            users: assignedUsers,
            totalUsers: assignedUsers.length,
            jointType,
            approvalRule,
            name

        });

    account.isJoint = true;
    account.jointAccountId = jointAccount._id;

    await account.save();

    return jointAccount;
};

exports.getAllJointAccounts = () =>
    repository.findAll();

exports.getJointAccountById = (id) =>
    repository.findById(id);

exports.getJointAccountsByBranch = (branchId) =>
    repository.findByBranch(branchId);

exports.getJointAccountsByType = (jointType) =>
    repository.findByJointType(jointType);

exports.getJointAccountsByName = (name) =>
    repository.findByName(name);

exports.updateJointAccount = (id, data) =>
    repository.update(id, data);

exports.deleteJointAccount = (id) =>
    repository.delete(id);