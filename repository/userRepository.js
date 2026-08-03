const User = require("../model/Users");

exports.createUser = (data) => User.create(data);

exports.findUserByEmail = (email) => {
    return User.findOne({ email: email.toLowerCase() });
};

exports.findUserByPhone = (phone) => {
    return User.findOne({ phone });
};

exports.findUserById = (id) => {
    return User.findById(id).populate(
        "branchId",
        "name code city bankId"
    );
};

exports.findUserByEmailAndBank = async (email, bankId) => {
    const users = await User.find({ email }).populate("branchId");

    return users.find(
        (user) =>
            user.branchId?.bankId?.toString() === bankId.toString()
    );
};

exports.findUsers = async (query = {}) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {};

    if (query.role) {
        filter.role = query.role;
    }

    if (query.search) {
        filter.$or = [
            {
                email: {
                    $regex: query.search,
                    $options: "i",
                },
            },
            {
                phone: {
                    $regex: query.search,
                    $options: "i",
                },
            },
        ];
    }

    const users = await User.find(filter)
        .populate("branchId", "name code city bankId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments(filter);

    return {
        data: users,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

exports.updateUser = (id, data) => {
    return User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    }).populate("branchId", "name code city bankId");
};

exports.deleteUser = (id) => {
    return User.findByIdAndDelete(id);
};