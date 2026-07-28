exports.validateSufficientBalance = (
    balance,
    amount
) => {

    if (balance < amount) {
        throw new Error("Insufficient account balance.");
    }

};