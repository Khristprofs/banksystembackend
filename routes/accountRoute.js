const express = require("express");

const router = express.Router();

const accountController = require("../controller/accountController");
const validate = require("../middlewares/userMiddleware");
const childAccountMiddleware = require("../middlewares/childAccountMiddleware");
const {
  createAccountSchema,
  updateAccountSchema,
} = require("../validators/accountValidator");


// Create account
router.post(
  "/create",
  validate(createAccountSchema),
  childAccountMiddleware,
  accountController.createAccount
);


// Get currently authenticated user's accounts
router.get("/me", accountController.getMyAccounts);


// Get all accounts
router.get("/all", accountController.getAccounts);


// Get accounts by account number
router.get("/number/:number", accountController.getAccountByNumber);


// Get accounts by user
router.get("/user/:userId", accountController.getAccountsByUser);


// Get accounts by branch
router.get("/branch/:branchId", accountController.getAccountsByBranch);


// Get child accounts
router.get("/parent/:parentId", accountController.getChildAccountsByParent);


// Get accounts by type
router.get("/type/:type", accountController.getAccountsByType);


// Get accounts by currency
router.get("/currency/:currency", accountController.getAccountsByCurrency);


// Update account
router.put(
  "/:id",
  validate(updateAccountSchema),
  accountController.updateAccount
);


// Delete account
router.delete("/delete/:id", accountController.deleteAccount);


// Get balance
router.get(
  "/:id/balance",
  accountController.getBalance
);


module.exports = router;