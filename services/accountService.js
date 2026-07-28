const accountRepo = require("../repository/accountRepository");
const Branch = require("../model/Branch");
const generateAccountNumber = require("../utils/accountNumberUtiles");

const {
    LIMITS,
    detectTierByBalance,
    formatAccount,
} = require("../utils/tierLimitUtil");

exports.createAccount = async (data) => {

    const branch =
        await Branch.findById(data.branchId);

    if (!branch) {
        throw new Error("Branch not found");
    }

    const existingUserAccount = await accountRepo.getExistingUserAccount(data.userId);

    if (existingUserAccount) {
        throw new Error(
            "User already has an account in this bank"
        );
    }

    let accountNumber;
    let exists = true;

    while (exists) {

        accountNumber = generateAccountNumber(branch.code);
        const existingAccount = await accountRepo.getByAccountNumber(accountNumber);
        if (!existingAccount) {
            exists = false;
        }
    }

    const detectedTier = detectTierByBalance(data.balance || 0);
    data.kycLevel = detectedTier;

    const limits = LIMITS[detectedTier];

    data.accountNumber = accountNumber;
    data.limits = limits;
    data.availableBalance = data.balance || 0;
    data.ledgerBalance = data.balance || 0;

    const account = await accountRepo.createAccount(data);

    return formatAccount(account);
};

exports.getAccounts = async () => {

    const accounts =
        await accountRepo.getAccounts();

    return accounts.map(formatAccount);
};

exports.getAccountById = async (id) => {

    const account =
        await accountRepo.getAccountById(id);

    return formatAccount(account);
};

exports.getAccountsByBranch = async (branchId) => {

    const accounts =
        await accountRepo.getByBranch(branchId);

    return accounts.map(formatAccount);
};

exports.getAccountsByUser = async (userId) => {

    const accounts =
        await accountRepo.getByUserId(userId);

    return accounts.map(formatAccount);
};

exports.getAccountByNumber = async (number) => {

    const account =
        await accountRepo.getByAccountNumber(number);

    return formatAccount(account);
};

exports.getAccountsByType = async (type) => {

    const accounts =
        await accountRepo.getByAccountType(type);

    return accounts.map(formatAccount);
};

exports.getChildAccountsByParent = async (parentId) => {

    const accounts =
        await accountRepo.getChildAccountsByParent(parentId);

    return accounts.map(formatAccount);
};

exports.getAccountsByCurrency = async (currency) => {

    const accounts =
        await accountRepo.getByCurrency(currency);

    return accounts.map(formatAccount);
};

exports.updateAccount = async (id, data) => {

    const account =
        await accountRepo.updateAccount(id, data);

    return formatAccount(account);
};

exports.deleteAccount = async (id) =>
    await accountRepo.deleteAccount(id);