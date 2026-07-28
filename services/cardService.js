const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const cardRepository = require("../repository/cardRepository");

const User = require("../model/Users");
const Account = require("../model/Account");
const Branch = require("../model/Branch");

const { generateCardNumber } = require("../utils/cardGenerator");
const { generateCardReference } = require("../utils/cardReference");
const { generateCVV } = require("../utils/cvvGenerator");
const { generateExpiryDate } = require("../utils/expiryGenerator");
const { maskCardNumber } = require("../utils/maskCard");

class CardService {
    async getAllCards() {
        return await cardRepository.findAll();
    }

    async getCardsByBank(bankId) {
        return await cardRepository.findByBankId(bankId);
    }

    async getCardsByBranch(branchId) {
        return await cardRepository.findByBranchId(branchId);
    }

    async getCardById(id) {
        const card = await cardRepository.findById(id);

        if (!card) {
            throw new Error("Card not found.");
        }

        return card;
    }

    async getCardByReference(reference) {
        const card = await cardRepository.findByCardReference(reference);

        if (!card) {
            throw new Error("Card not found.");
        }

        return card;
    }

    async getCardByNumber(number) {
        const card = await cardRepository.findByCardNumber(number);

        if (!card) {
            throw new Error("Card not found.");
        }

        return card;
    }

    async getCardsByUser(userId) {
        return await cardRepository.findByUserId(userId);
    }

    async getCardsByAccount(accountId) {
        return await cardRepository.findByAccountId(accountId);
    }

    async createCard(data) {

        const session = await mongoose.startSession();

        session.startTransaction();

        try {

            const user = await User.findById(data.userId);

            if (!user) {
                throw new Error("User not found.");
            }

            const account = await Account.findById(data.accountId);

            if (!account) {
                throw new Error("Account not found.");
            }

            const branch = await Branch.findById(data.branchId);

            if (!branch) {
                throw new Error("Branch not found.");
            }

            let cardNumber;

            do {
                cardNumber = generateCardNumber();
            } while (await cardRepository.existsByCardNumber(cardNumber));

            let cardReference;

            do {
                cardReference = generateCardReference();
            } while (await cardRepository.existsByCardReference(cardReference));

            const cvv = generateCVV();

            const pinHash = await bcrypt.hash(data.pin, 10);

            const cvvHash = await bcrypt.hash(cvv, 10);

            const card = await cardRepository.create({
                userId: data.userId,
                branchId: data.branchId,
                accountId: data.accountId,

                cardReference,

                cardNumber,

                maskedCardNumber: maskCardNumber(cardNumber),

                cardType: data.cardType,

                cardNetwork: data.cardNetwork,

                expiryDate: generateExpiryDate(),

                cvvHash,

                pinHash,

                cardHolderName: data.cardHolderName,

                currency: data.currency || "NGN",

                isActive: false,

                status: "inactive"
            });

            await session.commitTransaction();

            session.endSession();

            return {
                ...card.toObject(),
                cvv
            };

        } catch (error) {

            await session.abortTransaction();

            session.endSession();

            throw error;
        }
    }

    async updateCard(id, data) {

        const card = await cardRepository.findById(id);

        if (!card) {
            throw new Error("Card not found.");
        }

        const allowedFields = [
            "status",
            "isFrozen",
            "isActive",
            "currency",
            "cardHolderName",
            "limits",
            "channels",
            "metadata"
        ];

        const updateData = {};

        allowedFields.forEach(field => {

            if (data[field] !== undefined) {

                updateData[field] = data[field];

            }

        });

        return await cardRepository.update(id, updateData);
    }

    async deleteCard(id) {

        const card = await cardRepository.findById(id);

        if (!card) {
            throw new Error("Card not found.");
        }

        return await cardRepository.delete(id);
    }
}

module.exports = new CardService();