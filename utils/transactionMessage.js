exports.depositMessage = (
    amount,
    balance,
    reference
) => {

    return `₦${amount.toLocaleString()} has been credited to your account.

Available Balance: ₦${balance.toLocaleString()}.

Reference: ${reference}`;

};


exports.withdrawMessage = (
    amount,
    balance,
    reference
) => {

    return `₦${amount.toLocaleString()} has been debited from your account.

Available Balance: ₦${balance.toLocaleString()}.

Reference: ${reference}`;

};


exports.transferSenderMessage = (
    amount,
    accountNumber,
    balance,
    reference
) => {

    return `You transferred ₦${amount.toLocaleString()} to account ${accountNumber}.

Available Balance: ₦${balance.toLocaleString()}.

Reference: ${reference}`;

};


exports.transferReceiverMessage = (
    amount,
    accountNumber,
    balance,
    reference
) => {

    return `You received ₦${amount.toLocaleString()} from account ${accountNumber}.

Available Balance: ₦${balance.toLocaleString()}.

Reference: ${reference}`;

};