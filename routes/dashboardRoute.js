const express = require("express");

const router = express.Router();

const dashboardController = require("../controller/dashboardController");


router.get("/stats", dashboardController.getDashboardStats);

router.get(
    "/monthly-transactions",
    dashboardController.getMonthlyTransactions
);

router.get(
    "/monthly-deposits",
    dashboardController.getMonthlyDeposits
);

router.get(
    "/monthly-withdrawals",
    dashboardController.getMonthlyWithdrawals
);

router.get(
    "/recent-activity",
    dashboardController.getRecentActivity
);

module.exports = router;