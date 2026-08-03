const Bank = require("../model/Bank");

exports.createBank = async (req, res) => {
    try {

        const {
            name,
            country,
            address,
            description,
            logo,
        } = req.body;

        if (!name || !country || !address || !description) {
            return res.status(400).json({
                success: false,
                message: "Name, country, address and description are required."
            });
        }

        const existing = await Bank.findOne({
            $or: [
                { name: name.trim() },
            ]
        });

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Bank already exists."
            });
        }

        const bank = await Bank.create({
            name: name.trim(),
            logo,
            description: description.trim(),
            country: country.trim(),
            address: country.trim(),

        });

        return res.status(201).json({
            success: true,
            message: "Bank created successfully.",
            data: bank
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

exports.getBanks = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const [banks, total] = await Promise.all([

            Bank.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Bank.countDocuments()

        ]);

        return res.status(200).json({

            success: true,

            data: banks,

            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }

        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.getBankById = async (req, res) => {

    try {

        const bank = await Bank.findById(req.params.id);

        if (!bank) {

            return res.status(404).json({
                success: false,
                message: "Bank not found."
            });

        }

        return res.json({

            success: true,

            data: bank

        });

    } catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};
exports.getBankByName = async (req, res) => {
    try {
        const { name } = req.params;

        const bank = await Bank.findOne({
            name: { $regex: `^${name}$`, $options: "i" },
        });

        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: bank,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching bank by name",
            error: error.message,
        });
    }
};

exports.updateBank = async (req, res) => {

    try {

        const bank = await Bank.findById(req.params.id);

        if (!bank) {

            return res.status(404).json({
                success: false,
                message: "Bank not found."
            });

        }

        bank.name = req.body.name ?? bank.name;
        bank.country = req.body.country ?? bank.country;
        bank.address = req.body.address ?? bank.address;
        bank.description = req.body.description ?? bank.description;

        await bank.save();

        return res.json({

            success: true,

            message: "Bank updated successfully.",

            data: bank

        });

    } catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

exports.deleteBank = async (req, res) => {

    try {

        const bank = await Bank.findById(req.params.id);

        if (!bank) {

            return res.status(404).json({
                success: false,
                message: "Bank not found."
            });

        }

        await bank.deleteOne();

        return res.json({

            success: true,

            message: "Bank deleted successfully."

        });

    } catch (err) {

        return res.status(500).json({

            success: false,

            message: err.message

        });

    }

};