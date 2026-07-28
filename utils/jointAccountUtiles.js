exports.calculateApprovalRule = (jointType, users) => {

    if (jointType === "two_to_sign") {
        return {
            type: "ALL",
            minApprovals: users.length
        };
    }

    if (jointType === "admin_plus_one") {
        return {
            type: "ADMIN_PLUS_ONE",
            minApprovals: 2
        };
    }

};