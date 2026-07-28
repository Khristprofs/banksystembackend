const Bank = require("../model/Bank");

exports.creatBank = async (req, res) => {
    try{
        const { name, address, description, logo, country} = req.body

        if(!name || !address || !description || !logo || !country){
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }
        const existingBank = await Bank.findOne({name: name.trim(), logo: logo});
        if(existingBank){
            return res.status(409).json({
                success: false,
                message: "Bank already exist"
            })
        }

        const bank = await Bank.create({
            name: name.trim(),
            address: address.trim(),
            description,
            logo,
            country: country.trim(),
        });

        return res.status(201).json({
            success: true,
            message: "Bank created successfully",
            data: bank,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error creating bank",
            error: error.message
        })
    }
}

exports.getBanks = async (req, res) => {
    try {
        const banks = await Bank.find().populate('name');
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all banks",
            count: banks.length,
            data: banks
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Banks not found",
            error: error.message
        })
    }
}

exports.getBankById = async (req, res) => {
    try {
        const { id } = req.params;
        const bank = await Bank.findById(id);
        if (!bank){
            return res.status(404).json({
                success: false,
                message: "Bank not found"
            });
        }
        return res.status(200).json({
            success: true,
            date: bank
        });
    } catch(error){
        return res.status(404).json({
            success: false,
            message: "Bank not found",
            error: error.message
        })
    }
}
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
        const { id } = req.params;
        const updatedBank = await Bank.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!updatedBank) {
            return res.status(404).json({
                success: false,
                message: "Bank not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Bank updated successfully",
            data: updatedBank,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating bank",
            error: error.message,
        });
    }
};

exports.deleteBank = async (req, res) => {
    try {
        const { id } = req.params;
        const bank = await Bank.findByIdAndDelete(id);
        if (!bank) {
            return res.status(404).json({
                success: false,
                message: "Bank not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Bank deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting bank",
            error: error.message,
        });
    }
};