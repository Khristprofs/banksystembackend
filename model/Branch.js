const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bank",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    code:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    city: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    
}, { timestamps: true});

module.exports = mongoose.model("Branch", BranchSchema);