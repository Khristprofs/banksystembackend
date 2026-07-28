exports.calculateBalance = (
    currentBalance,
    amount,
    direction
) => {

    if (direction === "credit") {
        return currentBalance + amount;
    }

    return currentBalance - amount;

};