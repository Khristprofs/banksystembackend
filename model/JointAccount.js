const mongoose = require("mongoose");
const { Schema } = mongoose;

const JointAccountSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    totalUsers: {
      type: Number,
      required: true,
      min: 2,
      validate: {
        validator: function (value) {
          return value === this.users.length;
        },
        message: "totalUsers must match users array length",
      },
    },

    jointType: {
      type: String,
      enum: ["two_to_sign", "admin_plus_one"],
      required: true,
    },

    // Consent rule config (flexible for future)
    approvalRule: {
      type: {
        type: String,
        enum: ["ALL", "ADMIN_PLUS_ONE"],
        required: true,
      },
      minApprovals: {
        type: Number,
        required: true,
      },
    },

    pendingApprovals: [
      {
        transactionId: {
          type: Schema.Types.ObjectId,
          ref: "Transaction",
        },
        requestedBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
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
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },

    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JointAccount", JointAccountSchema);