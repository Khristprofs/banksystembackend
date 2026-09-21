const Bank = require("../model/Bank");
const User = require("../model/Users");
const Account = require("../model/Account");
const Transaction = require("../model/Transaction");
const Branch = require("../model/Branch");

const asyncHandler = require("../middlewares/asyncHandler");

// ============================================================
// Dashboard Statistics
// ============================================================
exports.getDashboardStats = asyncHandler(async (req, res) => {
    /*
    |--------------------------------------------------------------------------
    | Determine logged-in user
    |--------------------------------------------------------------------------
    */

    const user = req.user;

    /*
    |--------------------------------------------------------------------------
    | SYSTEM ADMIN
    |--------------------------------------------------------------------------
    |
    | System admin sees statistics for the entire banking system.
    |
    */

    if (user?.role === "admin") {
        const [
            totalBanks,
            totalUsers,
            totalAccounts,
            transactionVolumeResult,
        ] = await Promise.all([
            Bank.countDocuments(),

            User.countDocuments(),

            Account.countDocuments(),

            Transaction.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount",
                        },
                    },
                },
            ]),
        ]);

        const totalTransactionVolume =
            transactionVolumeResult.length > 0
                ? transactionVolumeResult[0].total
                : 0;

        return res.status(200).json({
            success: true,
            data: {
                totalBanks,
                totalUsers,
                totalAccounts,
                totalTransactionVolume,
            },
        });
    }

    /*
    |--------------------------------------------------------------------------
    | BANK ADMIN
    |--------------------------------------------------------------------------
    */

    if (user?.role === "bank_admin") {
        /*
        |--------------------------------------------------------------------------
        | Get the bank admin's branch
        |--------------------------------------------------------------------------
        |
        | Your project already uses branchId for users.
        | We use the bank attached to that branch.
        |
        */

        if (!user.branchId) {
            return res.status(200).json({
                success: true,
                data: {
                    totalBranches: 0,
                    totalStaff: 0,
                    totalCustomers: 0,
                    totalDeposits: 0,
                },
            });
        }

        const branch = await Branch.findById(user.branchId).select("bankId");

        if (!branch || !branch.bankId) {
            return res.status(200).json({
                success: true,
                data: {
                    totalBranches: 0,
                    totalStaff: 0,
                    totalCustomers: 0,
                    totalDeposits: 0,
                },
            });
        }

        const bankId = branch.bankId;

        /*
        |--------------------------------------------------------------------------
        | Find all branches belonging to this bank
        |--------------------------------------------------------------------------
        */

        const bankBranches = await Branch.find({
            bankId,
        }).select("_id");

        const branchIds = bankBranches.map((branch) => branch._id);

        /*
        |--------------------------------------------------------------------------
        | Count branches
        |--------------------------------------------------------------------------
        */

        const totalBranches = branchIds.length;

        /*
        |--------------------------------------------------------------------------
        | Count staff
        |--------------------------------------------------------------------------
        |
        | Staff are users attached to branches belonging to this bank.
        |
        */

        const totalStaff = await User.countDocuments({
            branchId: {
                $in: branchIds,
            },
            role: {
                $in: ["bank_staff", "staff"],
            },
        });

        /*
        |--------------------------------------------------------------------------
        | Count customers
        |--------------------------------------------------------------------------
        */

        const totalCustomers = await User.countDocuments({
            branchId: {
                $in: branchIds,
            },
            role: "customer",
        });

        /*
        |--------------------------------------------------------------------------
        | Calculate total deposits
        |--------------------------------------------------------------------------
        |
        | We identify transactions through accounts belonging to customers
        | in branches belonging to this bank.
        |
        */

        const bankUsers = await User.find({
            branchId: {
                $in: branchIds,
            },
            role: "customer",
        }).select("_id");

        const customerIds = bankUsers.map((customer) => customer._id);

        const bankAccounts = await Account.find({
            userId: {
                $in: customerIds,
            },
        }).select("_id");

        const accountIds = bankAccounts.map((account) => account._id);

        const depositResult = await Transaction.aggregate([
            {
                $match: {
                    accountId: {
                        $in: accountIds,
                    },
                    transactionType: "deposit",
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        const totalDeposits =
            depositResult.length > 0
                ? depositResult[0].total
                : 0;

        /*
        |--------------------------------------------------------------------------
        | Return data expected by BankAdminDashboard
        |--------------------------------------------------------------------------
        */

        return res.status(200).json({
            success: true,
            data: {
                totalBranches,
                totalStaff,
                totalCustomers,
                totalDeposits,
            },
        });
    }

    /*
    |--------------------------------------------------------------------------
    | DEFAULT RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
        success: true,
        data: {
            totalBranches: 0,
            totalStaff: 0,
            totalCustomers: 0,
            totalDeposits: 0,
        },
    });
});

// ============================================================
// Monthly Transactions
// ============================================================
exports.getMonthlyTransactions = asyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear + 1, 0, 1);

    const data = await Transaction.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
            },
        },
        {
            $group: {
                _id: {
                    $month: "$createdAt",
                },
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                "_id": 1,
            },
        },
    ]);

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const result = months.map((month, index) => {
        const found = data.find(
            (item) => item._id === index + 1
        );

        return {
            month,
            count: found ? found.count : 0,
        };
    });

    res.status(200).json({
        success: true,
        data: result,
    });
});

// ============================================================
// Monthly Deposits
// ============================================================
exports.getMonthlyDeposits = asyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear + 1, 0, 1);

    const data = await Transaction.aggregate([
        {
            $match: {
                transactionType: "deposit",
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
            },
        },
        {
            $group: {
                _id: {
                    $month: "$createdAt",
                },
                amount: {
                    $sum: "$amount",
                },
            },
        },
        {
            $sort: {
                "_id": 1,
            },
        },
    ]);

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const result = months.map((month, index) => {
        const found = data.find(
            (item) => item._id === index + 1
        );

        return {
            month,
            amount: found ? found.amount : 0,
        };
    });

    res.status(200).json({
        success: true,
        data: result,
    });
});

// ============================================================
// Monthly Withdrawals
// ============================================================
exports.getMonthlyWithdrawals = asyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear + 1, 0, 1);

    const data = await Transaction.aggregate([
        {
            $match: {
                transactionType: "withdrawal",
                createdAt: {
                    $gte: startDate,
                    $lt: endDate,
                },
            },
        },
        {
            $group: {
                _id: {
                    $month: "$createdAt",
                },
                amount: {
                    $sum: "$amount",
                },
            },
        },
        {
            $sort: {
                "_id": 1,
            },
        },
    ]);

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const result = months.map((month, index) => {
        const found = data.find(
            (item) => item._id === index + 1
        );

        return {
            month,
            amount: found ? found.amount : 0,
        };
    });

    res.status(200).json({
        success: true,
        data: result,
    });
});

// ============================================================
// Recent Activity
// ============================================================
exports.getRecentActivity = asyncHandler(async (req, res) => {
    const activities = await Transaction.find()
        .populate("userId", "firstName lastName")
        .sort({
            createdAt: -1,
        })
        .limit(10);

    res.status(200).json({
        success: true,
        data: activities,
    });
});