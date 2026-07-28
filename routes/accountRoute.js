const express = require("express");
const router = express.Router();

const accountController = require("../controller/accountController");
const validate = require("../middlewares/userMiddleware");
const childAccountMiddleware = require("../middlewares/childAccountMiddleware");
const { createAccountSchema, updateAccountSchema } = require("../validators/accountValidator");

router.post(
  "/create",
  validate(createAccountSchema),
  childAccountMiddleware,
  accountController.createAccount
);

router.get("/all", accountController.getAccounts);
router.get("/number/:number", accountController.getAccountByNumber);
router.get("/user/:userId", accountController.getAccountsByUser);
router.get("/branch/:branchId", accountController.getAccountsByBranch);
router.get("/parent/:parentId", accountController.getChildAccountsByParent);
router.get("/type/:type", accountController.getAccountsByType);
router.get("/currency/:currency", accountController.getAccountsByCurrency);

router.put(
  "/:id",
  validate(updateAccountSchema),
  accountController.updateAccount
);

router.delete("/delete/:id", accountController.deleteAccount);

module.exports = router;