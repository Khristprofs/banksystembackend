const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    jointAccountId: {
      type: Schema.Types.ObjectId,
      ref: "JointAccount",
      default: null,
    },

    transactionType: {
      type: String,
      enum: [
        "deposit",
        "withdrawal",
        "transfer",
        "fee",
        "reversal",
        "refund",
      ],
      required: true,
    },
    transactionMode: {
      type: String,
      enum: [
        "cash",
        "bank_transfer",
        "card",
        "ussd",
        "atm",
        "cheque"
      ],
      default: "bank_transfer"
    },

    direction: {
      type: String,
      enum: ["credit", "debit"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "NGN",
      uppercase: true,
      required: true,
    },

    fromAcctNo: {
      type: String,
      required: function () {
        return this.transactionType !== "deposit";
      },
    },

    toAcctNo: {
      type: String,
      required: function () {
        return this.transactionType === "transfer";
      }
    },
    receiverUserId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    balanceBefore: {
      type: Number,
    },

    balanceAfter: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
        "reversed",
      ],
      default: "pending",
      index: true,
    },

    reference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    externalReference: {
      type: String,
    },

    idempotencyKey: {
      type: String,
      index: true,
    },

    description: {
      type: String,
      trim: true,
    },

    channel: {
      type: String,
      enum: ["web", "mobile", "api", "atm", "pos"],
      default: "api",
    },

    fee: {
      type: Number,
      default: 0,
    },

    approvals: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        approvedAt: Date,
      },
    ],

    failureReason: {
      type: String,
    },

    reversedTransactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },

    metadata: {
      type: Schema.Types.Mixed,
    },

    transactionDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);