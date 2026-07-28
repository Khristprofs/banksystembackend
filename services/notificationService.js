const notificationRepository = require("../repository/notificationRepository");
const {
    generateTransactionReference,
} = require("../utils/generateTransactionReference");

class NotificationService {

    async createNotification(data, session = null) {
        return notificationRepository.create(data, session);
    }

    async createDepositNotification(transaction, session = null) {

        return this.createNotification(
            {
                userId: transaction.userId,
                accountId: transaction.accountId,
                branchId: transaction.branchId,
                transactionId: transaction._id,

                type: "deposit",
                direction: "credit",

                title: "Deposit Successful",

                message: `Your account has been credited with ${transaction.currency} ${Number(transaction.amount).toLocaleString()}.`,

                amount: transaction.amount,
                currency: transaction.currency,

                reference: transaction.reference || generateTransactionReference(),

                fromAcctNo: transaction.accountNumber,

                balanceAfter: transaction.balanceAfter,

                deliveryStatus: "sent",
            },
            session
        );

    }

    async createWithdrawalNotification(transaction, session = null) {

        return this.createNotification(
            {
                userId: transaction.userId,
                accountId: transaction.accountId,
                branchId: transaction.branchId,
                transactionId: transaction._id,

                type: "withdrawal",
                direction: "debit",

                title: "Withdrawal Successful",

                message: `Your account has been debited with ${transaction.currency} ${Number(transaction.amount).toLocaleString()}.`,

                amount: transaction.amount,
                currency: transaction.currency,

                reference: transaction.reference,

                fromAcctNo: transaction.accountNumber,

                balanceAfter: transaction.balanceAfter,

                deliveryStatus: "sent",
            },
            session
        );

    }

    async createTransferSenderNotification(transaction, session = null) {

        return this.createNotification(
            {
                userId: transaction.userId,
                accountId: transaction.accountId,
                branchId: transaction.branchId,
                transactionId: transaction._id,

                type: "transfer",
                direction: "debit",

                title: "Transfer Successful",

                message: `You transferred ${transaction.currency} ${Number(transaction.amount).toLocaleString()} to ${transaction.toAcctNo}.`,

                amount: transaction.amount,
                currency: transaction.currency,

                reference: transaction.reference,

                fromAcctNo: transaction.fromAcctNo,
                toAcctNo: transaction.toAcctNo,

                balanceAfter: transaction.balanceAfter,

                deliveryStatus: "sent",
            },
            session
        );

    }

    async createTransferReceiverNotification(transaction, receiver, session = null) {

        return this.createNotification(
            {
                userId: receiver.userId,
                accountId: receiver._id,
                branchId: receiver.branchId,
                transactionId: transaction._id,

                type: "transfer",
                direction: "credit",

                title: "Credit Alert",

                message: `You received ${transaction.currency} ${Number(transaction.amount).toLocaleString()} from ${transaction.fromAcctNo}.`,

                amount: transaction.amount,
                currency: transaction.currency,

                reference: transaction.reference,

                fromAcctNo: transaction.fromAcctNo,
                toAcctNo: transaction.toAcctNo,

                balanceAfter: receiver.balance,

                deliveryStatus: "sent",
            },
            session
        );

    }

    async getAllNotifications() {

        return notificationRepository.findAll();

    }

    async getNotificationById(id) {

        const notification =
            await notificationRepository.findById(id);

        if (!notification) {
            throw new Error("Notification not found.");
        }

        return notification;

    }

    async getNotificationsByUser(userId) {

        return notificationRepository.findByUserId(userId);

    }

    async markAsRead(id) {

        const notification =
            await notificationRepository.markAsRead(id);

        if (!notification) {
            throw new Error("Notification not found.");
        }

        return notification;

    }

    async archiveNotification(id) {

        const notification =
            await notificationRepository.archive(id);

        if (!notification) {
            throw new Error("Notification not found.");
        }

        return notification;

    }

    async deleteNotification(id) {

        const notification =
            await notificationRepository.delete(id);

        if (!notification) {
            throw new Error("Notification not found.");
        }

        return notification;

    }

}

module.exports = new NotificationService();