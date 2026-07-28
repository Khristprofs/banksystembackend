const crypto = require("crypto");
const { generateCheckDigit } = require("./luhn");

exports.generateCardNumber = () => {
    /**
     * 539983 = Mastercard BIN
     */

    const bin = "539983";

    let accountIdentifier = "";

    while (accountIdentifier.length < 9) {
        accountIdentifier += crypto.randomInt(0, 10);
    }

    const partial = bin + accountIdentifier;

    const checkDigit = generateCheckDigit(partial);

    return partial + checkDigit;
};