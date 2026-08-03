const mongoose = require("mongoose");
const Branch = require("../model/Branch");
const Bank = require("../model/Bank");
const generateBranchCode = require("../services/branchService");

// ======================================================
// Create Branch
// ======================================================

exports.createBranch = async (req, res) => {
  try {
    const { bankId, name, phone, state, city } = req.body;

    if (!bankId || !name || !phone || !state || !city) {
      return res.status(400).json({
        success: false,
        message: "Bank, branch name, phone, state and city are required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bankId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid bank.",
      });
    }

    const bank = await Bank.findById(bankId);

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: "Bank not found.",
      });
    }

    const existingBranch = await Branch.findOne({
      bankId,
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    });

    if (existingBranch) {
      return res.status(409).json({
        success: false,
        message: "Branch already exists for this bank.",
      });
    }

    const code = generateBranchCode(bank.name, city);

    const branch = await Branch.create({
      bankId,
      name: name.trim(),
      phone: phone.trim(),
      state: state.trim(),
      city: city.trim(),
      code,
    });

    const populatedBranch = await Branch.findById(branch._id).populate(
      "bankId",
      "name"
    );

    return res.status(201).json({
      success: true,
      message: "Branch created successfully.",
      data: populatedBranch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating branch.",
      error: error.message,
    });
  }
};

// ======================================================
// Get All Branches (Pagination)
// ======================================================

exports.getBranches = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [branches, total] = await Promise.all([
      Branch.find()
        .populate("bankId", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Branch.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: branches,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching branches.",
      error: error.message,
    });
  }
};

// ======================================================
// Get Branch By Id
// ======================================================

exports.getBranchById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid branch id.",
      });
    }

    const branch = await Branch.findById(id).populate("bankId", "name");

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: branch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching branch.",
      error: error.message,
    });
  }
};

// ======================================================
// Get Branches By Bank
// ======================================================

exports.getBranchesByBank = async (req, res) => {
  try {
    const { bankId } = req.params;

    const branches = await Branch.find({ bankId })
      .populate("bankId", "name")
      .sort({ name: 1 });

    return res.status(200).json({
      success: true,
      count: branches.length,
      data: branches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching branches.",
      error: error.message,
    });
  }
};

// ======================================================
// Search Branch
// ======================================================

exports.getBranchByName = async (req, res) => {
  try {
    const { name } = req.params;

    const branches = await Branch.find({
      name: {
        $regex: name,
        $options: "i",
      },
    }).populate("bankId", "name");

    return res.status(200).json({
      success: true,
      count: branches.length,
      data: branches,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error searching branch.",
      error: error.message,
    });
  }
};

// ======================================================
// Update Branch
// ======================================================

exports.updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { bankId, city } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid branch id.",
      });
    }

    if (bankId) {
      const bank = await Bank.findById(bankId);

      if (!bank) {
        return res.status(404).json({
          success: false,
          message: "Bank not found.",
        });
      }

      if (city) {
        req.body.code = generateBranchCode(bank.name, city);
      }
    }

    const updatedBranch = await Branch.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("bankId", "name");

    if (!updatedBranch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Branch updated successfully.",
      data: updatedBranch,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating branch.",
      error: error.message,
    });
  }
};

// ======================================================
// Delete Branch
// ======================================================

exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid branch id.",
      });
    }

    const branch = await Branch.findByIdAndDelete(id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: "Branch not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Branch deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting branch.",
      error: error.message,
    });
  }
};