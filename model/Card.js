const mongoose = require("mongoose");
const { Schema } = mongoose;

const CardSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },

    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },

    cardReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },

    maskedCardNumber: {
      type: String,
      required: true,
    },

    cardType: {
      type: String,
      enum: ["debit", "credit", "virtual"],
      required: true,
    },

    cardNetwork: {
      type: String,
      enum: ["visa", "mastercard", "verve"],
      required: true,
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
        "blocked",
        "expired",
        "lost",
        "stolen",
      ],
      default: "inactive",
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    cvvHash: {
      type: String,
      required: true,
      select: false,
    },

    pinHash: {
      type: String,
      required: true,
      select: false,
    },

    token: {
      type: String,
      unique: true,
      index: true,
    },

    cardHolderName: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    currency: {
      type: String,
      default: "NGN",
      uppercase: true,
    },

    limits: {
      dailyWithdrawalLimit: {
        type: Number,
        default: 100000,
      },
      dailyPurchaseLimit: {
        type: Number,
        default: 200000,
      },
      perTransactionLimit: {
        type: Number,
        default: 50000,
      },
    },

    channels: {
      atm: { type: Boolean, default: true },
      pos: { type: Boolean, default: true },
      web: { type: Boolean, default: true },
      international: { type: Boolean, default: false },
    },

    failedPinAttempts: {
      type: Number,
      default: 0,
    },

    isPinBlocked: {
      type: Boolean,
      default: false,
    },

    isFrozen: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    lastUsedAt: Date,

    issuedAt: {
      type: Date,
      default: Date.now,
    },

    replacedCardId: {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", CardSchema);