const express = require("express");

const router = express.Router();

const dashboardController = require("../controller/dashboardController");

const verifyJWT = require("../middlewares/authenticateToken");
const verifyRoles = require("../helpers/verifyRole");

// Only admins can access
router.use(
    verifyJWT,
    verifyRoles("admin", "bank_admin")
);

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