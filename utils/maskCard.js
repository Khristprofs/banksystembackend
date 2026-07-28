exports.maskCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
};