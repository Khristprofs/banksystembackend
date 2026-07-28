const mongoose = require("mongoose");

const BankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    logo: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true});

module.exports = mongoose.model("Bank", BankSchema);