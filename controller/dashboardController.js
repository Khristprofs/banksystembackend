const mongoose = require("mongoose");

const Bank = require("../model/Bank");
const User = require("../model/Users");
const Account = require("../model/Account");
const Transaction = require("../model/Transaction");

const asyncHandler = require("../middlewares/");

// =============================
// Dashboard Statistics
// =============================
exports.getDashboardStats = asyncHandler(async (req, res) => {
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
                    total: { $sum: "$amount" },
                },
            },
        ]),
    ]);

    const totalTransactionVolume =
        transactionVolumeResult.length > 0
            ? transactionVolumeResult[0].total
            : 0;

    res.status(200).json({
        success: true,
        data: {
            totalBanks,
            totalUsers,
            totalAccounts,
            totalTransactionVolume,
        },
    });
});

exports.getMonthlyTransactions = asyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const data = await Transaction.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { "_id": 1 },
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
        const found = data.find((item) => item._id === index + 1);

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

exports.getMonthlyDeposits = asyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const data = await Transaction.aggregate([
        {
            $match: {
                transactionType: "deposit",
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                amount: { $sum: "$amount" },
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
        const found = data.find((item) => item._id === index + 1);

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

exports.getMonthlyWithdrawals = asyncHandler(async (req, res) => {
    const currentYear = new Date().getFullYear();

    const data = await Transaction.aggregate([
        {
            $match: {
                transactionType: "withdrawal",
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01`),
                    $lte: new Date(`${currentYear}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                amount: { $sum: "$amount" },
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
        const found = data.find((item) => item._id === index + 1);

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

exports.getRecentActivity = asyncHandler(async (req, res) => {
    const activities = await Transaction.find()
        .populate("userId", "firstName lastName")
        .sort({ createdAt: -1 })
        .limit(10);

    res.status(200).json({
        success: true,
        data: activities,
    });
});