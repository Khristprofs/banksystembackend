const transactionService = require("../services/transactionService");
const response = require("../helpers/responseHelper");

class TransactionController {

    async deposit(req, res) {
        try {

            console.log("Request body:", req.body);

            const transaction =
                await transactionService.deposit(req.body);

            return response.success(
                res,
                transaction,
                "Deposit completed successfully.",
                201
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    /**
     * ==========================================================
     * Withdraw
     * ==========================================================
     */
    async withdraw(req, res) {
        try {

            const transaction =
                await transactionService.withdraw(req.body);

            return response.success(
                res,
                transaction,
                "Withdrawal completed successfully.",
                201
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    /**
     * ==========================================================
     * Transfer
     * ==========================================================
     */
    async transfer(req, res) {
        try {

            const transaction =
                await transactionService.transfer(req.body);

            return response.success(
                res,
                transaction,
                "Transfer completed successfully.",
                201
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    /**
     * ==========================================================
     * Get All Transactions
     * ==========================================================
     */
    async getAllTransactions(req, res) {
        try {

            const transactions =
                await transactionService.getAllTransactions(req.query);

            return response.success(
                res,
                transactions,
                "Transactions retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    /**
     * ==========================================================
     * Get Transactions By Bank
     * ==========================================================
     */
    async getTransactionsByBank(req, res) {
        try {

            const transactions =
                await transactionService.getTransactionsByBank(
                    req.params.bankId
                );

            return response.success(
                res,
                transactions,
                "Bank transactions retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    /**
     * ==========================================================
     * Get Transactions By Branch
     * ==========================================================
     */
    async getTransactionsByBranch(req, res) {
        try {

            const transactions =
                await transactionService.getTransactionsByBranch(
                    req.params.branchId
                );

            return response.success(
                res,
                transactions,
                "Branch transactions retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    /**
     * ==========================================================
     * Get Transactions By User
     * ==========================================================
     */
    async getTransactionsByUser(req, res) {
        try {

            const transactions =
                await transactionService.getTransactionsByUser(
                    req.params.userId
                );

            return response.success(
                res,
                transactions,
                "User transactions retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    /**
     * ==========================================================
     * Get Transactions By Account
     * ==========================================================
     */
    async getTransactionsByAccount(req, res) {
        try {

            const transactions =
                await transactionService.getTransactionsByAccount(
                    req.params.accountId
                );

            return response.success(
                res,
                transactions,
                "Account transactions retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    /**
     * ==========================================================
     * Get Transactions By Joint Account
     * ==========================================================
     */
    async getTransactionsByJointAccount(req, res) {
        try {

            const transactions =
                await transactionService.getTransactionsByJointAccount(
                    req.params.jointAccountId
                );

            return response.success(
                res,
                transactions,
                "Joint account transactions retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 500
            );

        }
    }

    /**
     * ==========================================================
     * Get Transaction By ID
     * ==========================================================
     */
    async getTransactionById(req, res) {
        try {

            const transaction =
                await transactionService.getTransactionById(
                    req.params.id
                );

            return response.success(
                res,
                transaction,
                "Transaction retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 404
            );

        }
    }

    /**
     * ==========================================================
     * Get Transaction By Reference
     * ==========================================================
     */
    async getTransactionByReference(req, res) {
        try {

            const transaction =
                await transactionService.getTransactionByReference(
                    req.params.reference
                );

            return response.success(
                res,
                transaction,
                "Transaction retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 404
            );

        }
    }

    /**
     * ==========================================================
     * Update Transaction
     * ==========================================================
     */
    async updateTransaction(req, res) {
        try {

            const transaction =
                await transactionService.updateTransaction(
                    req.params.id,
                    req.body
                );

            return response.success(
                res,
                transaction,
                "Transaction updated successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 400
            );

        }
    }

    /**
     * ==========================================================
     * Delete Transaction
     * ==========================================================
     */
    async deleteTransaction(req, res) {
        try {

            const transaction =
                await transactionService.deleteTransaction(
                    req.params.id
                );

            return response.success(
                res,
                transaction,
                "Transaction deleted successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                err.statusCode || 404
            );

        }
    }

}

module.exports = new TransactionController();