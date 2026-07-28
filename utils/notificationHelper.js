exports.buildNotification = ({
    userId,
    accountId,
    branchId,
    transactionId,
    transactionType,
    direction,
    title,
    message,
    amount,
    currency,
    reference,
    fromAcctNo,
    toAcctNo,
    balanceAfter,
    metadata = {},
}) => {

    return {

        userId,

        accountId,

        branchId,

        transactionId,

        type: transactionType,

        direction,

        title,

        message,

        amount,

        currency,

        reference,

        fromAcctNo,

        toAcctNo,

        balanceAfter,

        metadata,

    };

};