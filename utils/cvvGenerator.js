const crypto = require("crypto");

exports.generateCVV = () => {
    return String(crypto.randomInt(100, 1000));
};