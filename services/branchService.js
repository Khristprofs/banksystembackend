const { v4: uuidv4 } = require("uuid");

const generateBranchCode = (bankName, city) => {
    const bankInitials = bankName
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    const cityCode = city.substring(0, 3).toUpperCase();

    const uniqueId = uuidv4().split("-")[0];

    return `${bankInitials}-${cityCode}-${uniqueId}`;
};

module.exports = generateBranchCode;