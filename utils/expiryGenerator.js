exports.generateExpiryDate = (years = 5) => {
    const expiry = new Date();

    expiry.setFullYear(expiry.getFullYear() + years);

    return expiry;
};