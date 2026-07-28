const Transaction = require("../model/Transaction");
const Branch = require("../model/Branch");

class TransactionRepository {

    async findAll(filters = {}) {

        return Transaction.find(filters)
            .populate("userId")
            .populate("accountId")
            .populate("branchId")
            .populate("jointAccountId")
            .sort({ transactionDate: -1 });

    }

    async findById(id) {

        return Transaction.findById(id)
            .populate("userId")
            .populate("accountId")
            .populate("branchId")
            .populate("jointAccountId");

    }

    async findByReference(reference) {

        return Transaction.findOne({ reference })
            .populate("userId")
            .populate("accountId")
            .populate("branchId")
            .populate("jointAccountId");

    }

    async findByUserId(userId) {

        return Transaction.find({ userId })
            .populate("accountId")
            .populate("branchId")
            .sort({ transactionDate: -1 });

    }

    async findByAccountId(accountId) {

        return Transaction.find({ accountId })
            .populate("userId")
            .populate("branchId")
            .sort({ transactionDate: -1 });

    }

    async findByJointAccountId(jointAccountId) {

        return Transaction.find({ jointAccountId })
            .populate("userId")
            .populate("accountId")
            .populate("branchId")
            .sort({ transactionDate: -1 });

    }

    async findByBranchId(branchId) {

        return Transaction.find({ branchId })
            .populate("userId")
            .populate("accountId")
            .sort({ transactionDate: -1 });

    }

    async findByBankId(bankId) {

        const branches = await Branch.find({
            bankId
        }).select("_id");

        const branchIds = branches.map(branch => branch._id);

        return Transaction.find({
            branchId: {
                $in: branchIds
            }
        })
            .populate("userId")
            .populate("accountId")
            .populate("branchId")
            .sort({ transactionDate: -1 });

    }

    async existsByReference(reference) {

        return Transaction.exists({
            reference
        });

    }

    async create(data, session = null) {

        let transaction;

        if (session) {

            const docs = await Transaction.create(
                [data],
                { session }
            );

            transaction = docs[0];

        } else {

            transaction = await Transaction.create(data);

        }

        return await Transaction.findById(transaction._id)
            .populate("userId")
            .populate("accountId")
            .populate("branchId")
            .populate("jointAccountId");

    }

    async update(id, data) {

        return Transaction.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
            .populate("userId")
            .populate("accountId")
            .populate("branchId")
            .populate("jointAccountId");

    }

    async delete(id) {

        return Transaction.findByIdAndDelete(id);

    }

}

module.exports = new TransactionRepository();