const Account = require("../model/Account");

exports.createAccount = (data) =>
    Account.create(data);

exports.getAccounts = () =>
    Account.find()

        .populate(
            "userId",
            "email phone status role"
        )

        .populate(
            "branchId",
            "name code city state"
        );

exports.getAccountById = (id) =>
    Account.findById(id)

        .populate(
            "userId",
            "email phone status role"
        )

        .populate(
            "branchId",
            "name code city state"
        );

// exports.getAccountById = async (id) => {

//     console.log("Searching account:", id);

//     const account = await Account.findById(id)
//         .populate("userId")
//         .populate("branchId");

//     console.log("Found account:", account);

//     return account;
// };
exports.getExistingUserAccount = (userId) =>
    Account.findOne({ userId });
exports.getByUserId = (userId) =>
    Account.find({ userId });

exports.getByAccountNumber = (accountNumber) =>
    Account.findOne({ accountNumber });

exports.getByBranch = (branchId) =>
    Account.find({ branchId });

exports.getByAccountType = (type) =>
    Account.find({ accountType: type });

exports.getChildAccountsByParent = (parentUserId) =>
    Account.find({ parentUserId });

exports.getByCurrency = (currency) =>
    Account.find({ currency });

exports.updateAccount = (id, data) =>
    Account.findByIdAndUpdate(
        id,
        data,
        { new: true }
    );

exports.deleteAccount = (id) =>
    Account.findByIdAndDelete(id);