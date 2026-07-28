const Card = require("../model/Card");
const Branch = require("../model/Branch");

class CardRepository {
    async findAll() {
        return Card.find()
            .populate("userId")
            .populate("branchId")
            .populate("accountId")
            .sort({ createdAt: -1 });
    }

    async findById(id) {
        return Card.findById(id)
            .populate("userId")
            .populate("branchId")
            .populate("accountId");
    }

    async findByCardReference(reference) {
        return Card.findOne({
            cardReference: reference,
        })
            .populate("userId")
            .populate("branchId")
            .populate("accountId");
    }

    async findByCardNumber(cardNumber) {
        return Card.findOne({
            cardNumber,
        })
            .populate("userId")
            .populate("branchId")
            .populate("accountId");
    }

    async findByUserId(userId) {
        return Card.find({
            userId,
        })
            .populate("userId")
            .populate("branchId")
            .populate("accountId")
            .sort({ createdAt: -1 });
    }

    async findByAccountId(accountId) {
        return Card.find({
            accountId,
        })
            .populate("userId")
            .populate("branchId")
            .populate("accountId")
            .sort({ createdAt: -1 });
    }

    async findByBranchId(branchId) {
        return Card.find({
            branchId,
        })
            .populate("userId")
            .populate("branchId")
            .populate("accountId")
            .sort({ createdAt: -1 });
    }

    async findByBankId(bankId) {
        const branches = await Branch.find({
            bankId,
        }).select("_id");

        const branchIds = branches.map(branch => branch._id);

        return Card.find({
            branchId: {
                $in: branchIds,
            },
        })
            .populate("userId")
            .populate("branchId")
            .populate("accountId")
            .sort({ createdAt: -1 });
    }

    async create(cardData) {
        return Card.create(cardData);
    }

    async update(id, updateData) {
        return Card.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("userId")
            .populate("branchId")
            .populate("accountId");
    }

    async delete(id) {
        return Card.findByIdAndDelete(id);
    }
    async existsByCardNumber(cardNumber) {
        return Card.exists({ cardNumber });
    }

    async existsByCardReference(cardReference) {
        return Card.exists({ cardReference });
    }
}

module.exports = new CardRepository();