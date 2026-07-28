const LIMITS = {

    tier1: {
        dailyTransactionLimit: 50000,
        dailyWithdrawalLimit: 20000,
        maxBalance: 300000,
    },

    tier2: {
        dailyTransactionLimit: 200000,
        dailyWithdrawalLimit: 100000,
        maxBalance: 2000000,
    },

    tier3: {
        dailyTransactionLimit: Infinity,
        dailyWithdrawalLimit: Infinity,
        maxBalance: Infinity,
    },

};

const detectTierByBalance = (balance = 0) => {

    if (balance <= LIMITS.tier1.maxBalance) {
        return "tier1";
    }

    if (balance <= LIMITS.tier2.maxBalance) {
        return "tier2";
    }

    return "tier3";
};

const formatAccount = (account) => {

    const obj = account.toObject();

    const isChildAccount =
        obj.accountType === "savings" &&
        obj.accountSubType === "child";

    if (!isChildAccount) {

        delete obj.childSettings;
        delete obj.parentUserId;
    }

    if (obj.accountType !== "savings") {
        delete obj.accountSubType;
    }

    return obj;
};

module.exports = {
    LIMITS,
    detectTierByBalance,
    formatAccount,
};