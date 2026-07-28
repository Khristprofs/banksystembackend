const express = require("express");

const router = express.Router();

const transactionController = require("../controller/transactionController");

const validate = require("../middlewares/validate");

const {
    depositSchema,
    withdrawSchema,
    transferSchema,
    updateTransactionSchema,
} = require("../validators/transactionValidator");

/*
|--------------------------------------------------------------------------
| Business Operations
|--------------------------------------------------------------------------
*/

router.post(
    "/deposit",
    validate(depositSchema),
    transactionController.deposit
);

router.post(
    "/withdraw",
    validate(withdrawSchema),
    transactionController.withdraw
);

router.post(
    "/transfer",
    validate(transferSchema),
    transactionController.transfer
);

/*
|--------------------------------------------------------------------------
| Queries
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    transactionController.getAllTransactions
);

router.get(
    "/bank/:bankId",
    transactionController.getTransactionsByBank
);

router.get(
    "/branch/:branchId",
    transactionController.getTransactionsByBranch
);

router.get(
    "/user/:userId",
    transactionController.getTransactionsByUser
);

router.get(
    "/account/:accountId",
    transactionController.getTransactionsByAccount
);

router.get(
    "/joint-account/:jointAccountId",
    transactionController.getTransactionsByJointAccount
);

router.get(
    "/reference/:reference",
    transactionController.getTransactionByReference
);

router.get(
    "/:id",
    transactionController.getTransactionById
);

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id",
    validate(updateTransactionSchema),
    transactionController.updateTransaction
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    transactionController.deleteTransaction
);

module.exports = router;