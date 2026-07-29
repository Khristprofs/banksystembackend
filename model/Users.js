const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: function () {
        return this.role !== "admin";
      },
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["bank_admin", "staff", "customer", "admin", "customer_service"],
      default: "customer",
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "blocked"],
      default: "active",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    passwordChangedAt: {
      type: Date,
    },

    refreshTokens: [
      {
        token: {
          type: String,
          required: true,
          select: false,
        },

        device: String,

        ipAddress: String,

        userAgent: String,

        expiresAt: Date,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);