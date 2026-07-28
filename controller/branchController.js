const Branch = require("../model/Branch");
const Bank = require("../model/Bank");
const generateBranchCode = require("../services/branchService");

exports.createBranch = async (req, res) => {
    try {
        const { bankId, name, phone, state, city } = req.body;
        const bank = await Bank.findById(bankId);

        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank not found"
            });
        }
        const code = generateBranchCode(bank.name, city);
        const branch = await Branch.create({
            bankId,
            name,
            phone,
            state,
            city,
            code
        });

        res.status(201).json({
            success: true,
            message: "Branch created successfully",
            data: branch
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getBranches = async (req, res) => {
    try {

        const branches = await Branch.find()
            .populate("bankId", "name");

        res.status(200).json({
            success: true,
            count: branches.length,
            data: branches
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getBranchById = async (req, res) => {
    try {

        const branch = await Branch.findById(req.params.id)
            .populate("bankId", "name");

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            });
        }

        res.status(200).json({
            success: true,
            data: branch
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getBranchesByBank = async (req, res) => {
    try {
        const branches = await Branch.find({
            bankId: req.params.bankId
        });

        res.status(200).json({
            success: true,
            count: branches.length,
            data: branches
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getBranchByName = async (req, res) => {
    try {

        const branches = await Branch.find({
            name: { $regex: req.params.name, $options: "i" }
        });

        res.status(200).json({
            success: true,
            count: branches.length,
            data: branches
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateBranch = async (req, res) => {
    try {

        const { bankId, city } = req.body;

        if (bankId) {

            const bank = await Bank.findById(bankId);

            if (!bank) {
                return res.status(404).json({
                    success: false,
                    message: "Bank not found"
                });
            }

            if (city) {
                req.body.code = generateBranchCode(bank.name, city);
            }
        }

        const branch = await Branch.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Branch updated successfully",
            data: branch
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.deleteBranch = async (req, res) => {
    try {

        const branch = await Branch.findByIdAndDelete(req.params.id);

        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Branch deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};