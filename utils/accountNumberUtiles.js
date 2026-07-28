const { v4: uuidv4 } = require("uuid");

const letterToDigit = (letter) => {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return (
        (alphabet.indexOf(letter.toUpperCase()) + 1) % 10
    ).toString();
};

const generateAccountNumber = (branchCode) => {

    if (!branchCode) {
        throw new Error("Branch code is required");
    }

    const bankInitials = branchCode.split("-")[0];

    let prefix = "";

    for (const char of bankInitials) {
        prefix += letterToDigit(char);
    }

    prefix = prefix.slice(0, 3);

    const remainingLength = 10 - prefix.length;

    let uuidDigits = "";

    // Generate enough digits
    while (uuidDigits.length < remainingLength) {
        uuidDigits += uuidv4().replace(/\D/g, "");
    }

    uuidDigits = uuidDigits.slice(0, remainingLength);

    return `${prefix}${uuidDigits}`;
};

module.exports = generateAccountNumber;