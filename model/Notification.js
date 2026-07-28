const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    // User receiving the notification
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Related bank account
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    // Branch
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    // Related transaction
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },

    // Optional for joint accounts
    jointAccountId: {
      type: Schema.Types.ObjectId,
      ref: "JointAccount",
      default: null,
    },

    // Notification category
    type: {
      type: String,
      enum: [
        "deposit",
        "withdrawal",
        "transfer",
        "fee",
        "refund",
        "reversal",
        "system",
        "security",
      ],
      required: true,
    },

    // Credit or debit alert
    direction: {
      type: String,
      enum: ["credit", "debit"],
    },

    // Notification title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Notification body
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Amount involved
    amount: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "NGN",
      uppercase: true,
    },

    // Transaction reference
    reference: {
      type: String,
      required: true,
      index: true,
    },

    // Sender account
    fromAcctNo: {
      type: String,
    },

    // Receiver account
    toAcctNo: {
      type: String,
    },

    // Current balance after transaction
    balanceAfter: {
      type: Number,
      default: 0,
    },

    // Notification delivery channel
    channel: {
      type: String,
      enum: ["in_app", "email", "sms", "push"],
      default: "in_app",
    },

    // Delivery status
    deliveryStatus: {
      type: String,
      enum: ["pending", "sent", "delivered", "failed"],
      default: "pending",
    },

    // Read status
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },

    // Archived notification
    isArchived: {
      type: Boolean,
      default: false,
    },

    archivedAt: {
      type: Date,
      default: null,
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Frequently used queries
NotificationSchema.index({ userId: 1, isRead: 1 });

NotificationSchema.index({
  userId: 1,
  createdAt: -1,
});

NotificationSchema.index({
  transactionId: 1,
});

module.exports = mongoose.model("Notification", NotificationSchema);