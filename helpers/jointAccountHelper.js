exports.assignRoles = (users) => {
    return users.map((user, index) => {
        if (index === 0) {
            return { ...user, role: "admin" };
        }
        return { ...user, role: "member" };

    });

};