const mongoose = require("mongoose");
const { Schema } = mongoose;

const kycSchema = new Schema({
  bvn: String,
  nin: String,
  verificationStatus: {
    type: String,
    enum: ["unverified", "pending", "verified", "rejected"],
    default: "unverified",
  },
  documents: [
    {
      type: {
        type: String,
      },
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const UserProfileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    profileImg: {
      type: String,
      default: null,
      trim: true,
    },

    bio: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true
    },

    dateOfBirth: {
      type: Date,
      required: true
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },


    address: {
      street: String,
      city: String,
      state: String,
      country: {
        type: String,
        default: "Nigeria",
      },
    },

    kyc: {
      type: kycSchema,
      default: () => ({}),
    },

    nextOfKin: {
      name: String,
      relationship: String,
      phoneNumber: String,
    },

    isPoliticallyExposed: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserProfile", UserProfileSchema);