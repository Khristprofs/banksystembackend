const mongoose = require("mongoose");

const transactionRepository = require("../repository/transactionRepository");
const notificationRepository = require("../repository/notificationRepository");
const accountRepository = require("../repository/accountRepository");
const { generateTransactionReference } = require("../utils/generateTransactionReference")

class TransactionService {

    async deposit(data) {

        const session = await mongoose.startSession();

        try {

            session.startTransaction();

            const account =
                await accountRepository.getByAccountNumber(
                    data.accountNumber
                );

            if (!account) {
                throw new Error("Account not found.");
            }

            const balanceBefore = account.balance;

            account.balance += Number(data.amount);
            account.availableBalance += Number(data.amount);
            account.ledgerBalance += Number(data.amount);

            const balanceAfter = account.balance;

            account.lastTransactionDate = new Date();

            await account.save({ session });

            const transaction = await transactionRepository.create(
                {
                    reference: generateTransactionReference(),

                    userId: account.userId,
                    accountId: account._id,
                    branchId: account.branchId,

                    accountNumber: account.accountNumber,

                    transactionType: "deposit",
                    transactionMode: data.transactionMode || "cash",

                    direction: "credit",

                    amount: data.amount,
                    currency: account.currency,

                    balanceBefore,
                    balanceAfter,

                    fromAcctNo: account.accountNumber,
                    toAcctNo: null,

                    status: "completed",

                    description: data.description,
                    channel: data.channel
                },
                session
            );

            await notificationRepository.create(
                {
                    userId: transaction.userId,
                    accountId: transaction.accountId,
                    branchId: transaction.branchId,
                    transactionId: transaction._id,

                    type: "deposit",
                    direction: "credit",

                    title: "Deposit Successful",
                    message: `Your account has been credited with ₦${Number(transaction.amount).toLocaleString()}.`,

                    amount: transaction.amount,
                    currency: transaction.currency,

                    reference: transaction.reference,

                    fromAcctNo: transaction.fromAcctNo,
                    toAcctNo: transaction.toAcctNo,

                    balanceAfter: transaction.balanceAfter,

                    channel: "in_app",
                    deliveryStatus: "sent"
                },
                session
            );

            await session.commitTransaction();

            return transaction;

        } catch (error) {

            await session.abortTransaction();
            throw error;

        } finally {

            session.endSession();

        }

    }


    async withdraw(data) {

        const session = await mongoose.startSession();

        try {

            session.startTransaction();

            const account =
                await accountRepository.getByAccountNumber(
                    data.accountNumber
                );

            if (!account) {
                throw new Error("Account not found.");
            }

            if (account.balance < data.amount) {
                throw new Error("Insufficient balance.");
            }

            account.balance -= Number(data.amount);
            account.availableBalance -= Number(data.amount);
            account.ledgerBalance -= Number(data.amount);

            account.lastTransactionDate = new Date();

            await account.save({ session });

            const transaction =
                await transactionRepository.create(
                    {
                        userId: account.userId,
                        accountId: account._id,
                        branchId: account.branchId,
                        accountNumber: account.accountNumber,
                        transactionType: "withdrawal",
                        transactionMode: "cash",
                        amount: data.amount,
                        currency: account.currency,
                        status: "completed",
                        description: data.description,
                        channel: data.channel,
                        balanceAfter: account.balance
                    },
                    session
                );

            await notificationRepository.create(
                {
                    userId: account.userId,
                    title: "Withdrawal Successful",
                    message: `Your account has been debited with ${data.amount} ${account.currency}.`
                },
                session
            );

            await session.commitTransaction();

            return transaction;

        } catch (error) {

            await session.abortTransaction();
            throw error;

        } finally {

            session.endSession();

        }

    }

    /**
     * ==========================================================
     * Transfer
     * ==========================================================
     */
    /**
  * ==========================================================
  * Transfer
  * ==========================================================
  */
    async transfer(data) {

        const session = await mongoose.startSession();

        try {

            session.startTransaction();

            const sender =
                await accountRepository.getByAccountNumber(
                    data.fromAccountNumber
                );

            if (!sender) {
                throw new Error("Sender account not found.");
            }

            const receiver =
                await accountRepository.getByAccountNumber(
                    data.toAccountNumber
                );

            if (!receiver) {
                throw new Error("Receiver account not found.");
            }

            if (sender.balance < data.amount) {
                throw new Error("Insufficient balance.");
            }

            sender.balance -= Number(data.amount);
            sender.availableBalance -= Number(data.amount);
            sender.ledgerBalance -= Number(data.amount);

            receiver.balance += Number(data.amount);
            receiver.availableBalance += Number(data.amount);
            receiver.ledgerBalance += Number(data.amount);

            sender.lastTransactionDate = new Date();
            receiver.lastTransactionDate = new Date();

            await sender.save({ session });
            await receiver.save({ session });

            const transaction =
                await transactionRepository.create(
                    {
                        userId: sender.userId,
                        accountId: sender._id,
                        branchId: sender.branchId,
                        accountNumber: sender.accountNumber,
                        receiverAccountId: receiver._id,
                        receiverAccountNumber: receiver.accountNumber,
                        transactionType: "transfer",
                        transactionMode: "transfer",
                        amount: data.amount,
                        currency: sender.currency,
                        status: "completed",
                        description: data.description,
                        channel: data.channel,
                        balanceAfter: sender.balance
                    },
                    session
                );

            await notificationRepository.create(
                {
                    userId: sender.userId,
                    title: "Transfer Successful",
                    message: `₦${Number(data.amount).toLocaleString()} transferred to ${receiver.accountNumber}.`
                },
                session
            );

            await notificationRepository.create(
                {
                    userId: receiver.userId,
                    title: "Credit Alert",
                    message: `₦${Number(data.amount).toLocaleString()} received from ${sender.accountNumber}.`
                },
                session
            );

            await session.commitTransaction();

            return transaction;

        } catch (error) {

            await session.abortTransaction();
            throw error;

        } finally {

            session.endSession();

        }

    }

    /**
     * ==========================================================
     * Get All Transactions
     * ==========================================================
     */
    async getAllTransactions(filters = {}) {

        return await transactionRepository.findAll(filters);

    }

    /**
     * ==========================================================
     * Get Transactions By Bank
     * ==========================================================
     */
    async getTransactionsByBank(bankId) {

        return await transactionRepository.findByBankId(bankId);

    }

    /**
     * ==========================================================
     * Get Transactions By Branch
     * ==========================================================
     */
    async getTransactionsByBranch(branchId) {

        return await transactionRepository.findByBranchId(branchId);

    }

    /**
     * ==========================================================
     * Get Transactions By User
     * ==========================================================
     */
    async getTransactionsByUser(userId) {

        return await transactionRepository.findByUserId(userId);

    }

    /**
     * ==========================================================
     * Get Transactions By Account
     * ==========================================================
     */
    async getTransactionsByAccount(accountId) {

        return await transactionRepository.findByAccountId(accountId);

    }

    /**
     * ==========================================================
     * Get Transactions By Joint Account
     * ==========================================================
     */
    async getTransactionsByJointAccount(jointAccountId) {

        return await transactionRepository.findByJointAccountId(jointAccountId);

    }

    /**
     * ==========================================================
     * Get Transaction By ID
     * ==========================================================
     */
    async getTransactionById(id) {

        const transaction =
            await transactionRepository.findById(id);

        if (!transaction) {
            throw new Error("Transaction not found.");
        }

        return transaction;

    }

    /**
     * ==========================================================
     * Get Transaction By Reference
     * ==========================================================
     */
    async getTransactionByReference(reference) {

        const transaction =
            await transactionRepository.findByReference(reference);

        if (!transaction) {
            throw new Error("Transaction not found.");
        }

        return transaction;

    }

    /**
     * ==========================================================
     * Update Transaction
     * ==========================================================
     */
    async updateTransaction(id, data) {

        const transaction =
            await transactionRepository.update(id, data);

        if (!transaction) {
            throw new Error("Transaction not found.");
        }

        return transaction;

    }

    /**
     * ==========================================================
     * Delete Transaction
     * ==========================================================
     */
    async deleteTransaction(id) {

        const transaction =
            await transactionRepository.delete(id);

        if (!transaction) {
            throw new Error("Transaction not found.");
        }

        return transaction;

    }

}

module.exports = new TransactionService();