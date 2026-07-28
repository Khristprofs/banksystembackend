const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccountSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  accountNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  accountType: {
    type: String,
    enum: ["savings", "current", "fixed_deposit", "business"],
    required: true,
  },

  accountSubType: {
    type: String,
    enum: ["student", "personal", "child", "salary"],
  },

  parentUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  limits: {
    dailyTransactionLimit: {
      type: Number,
      default: 0,
    },

    dailyWithdrawalLimit: {
      type: Number,
      default: 0,
    },

    maxBalance: {
      type: Number,
      default: 0,
    },
  },

  dailyTransactionAmount: {
    type: Number,
    default: 0,
  },

  lastTransactionDate: {
    type: Date,
  },

  childSettings: {

    canDeposit: {
      type: Boolean,
      default: true,
    },

    canWithdraw: {
      type: Boolean,
      default: false,
    },

    canTransfer: {
      type: Boolean,
      default: false,
    },

    requiresParentApproval: {
      type: Boolean,
      default: true,
    },

    _id: false,
  },

  kycLevel: {
    type: String,
    enum: ["tier1", "tier2", "tier3"],
    default: "tier1",
  },

  freezeReason: {
    type: String,
  },

  closedAt: {
    type: Date,
  },

  currency: {
    type: String,
    uppercase: true,
    default: "NGN",
    required: true,
  },

  balance: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },

  availableBalance: {
    type: Number,
    default: 0,
    min: 0,
  },

  ledgerBalance: {
    type: Number,
    default: 0,
    min: 0,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  status: {
    type: String,
    enum: ["active", "frozen", "closed", "suspended"],
    default: "active",
  },

  branchId: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },

}, { timestamps: true });

AccountSchema.pre("validate", function () {

  if (
    this.accountType !== "savings" &&
    this.accountSubType
  ) {
    throw new Error(
      "Only savings account can have subtype"
    );
  }

  if (
    this.accountSubType === "child" &&
    !this.parentUserId
  ) {
    throw new Error(
      "Child account requires parent user"
    );
  }

});

AccountSchema.pre("save", function () {

  const isChildAccount =
    this.accountType === "savings" &&
    this.accountSubType === "child";

  if (!isChildAccount) {
    this.childSettings = undefined;
    this.parentUserId = undefined;
  }

  if (this.accountType !== "savings") {
    this.accountSubType = undefined;
  }

});

module.exports = mongoose.model("Account", AccountSchema);