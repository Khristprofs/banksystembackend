const { v4: uuid } = require("uuid");

exports.generateTransactionReference = () => {
    return `TXN-${uuid()
        .replace(/-/g, "")
        .substring(0, 16)
        .toUpperCase()}`;
};