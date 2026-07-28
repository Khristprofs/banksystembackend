const cardService = require("../services/cardService");
const response = require("../helpers/responseHelper");

class CardController {

    async getAllCards(req, res) {
        try {

            const cards = await cardService.getAllCards();

            return response.success(
                res,
                cards,
                "Cards retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message
            );

        }
    }

    async getCardsByBank(req, res) {
        try {

            const { bankId } = req.params;

            const cards = await cardService.getCardsByBank(bankId);

            return response.success(
                res,
                cards,
                "Bank cards retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message
            );

        }
    }

    async getCardsByBranch(req, res) {
        try {

            const { branchId } = req.params;

            const cards = await cardService.getCardsByBranch(branchId);

            return response.success(
                res,
                cards,
                "Branch cards retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message
            );

        }
    }

    async getCardById(req, res) {
        try {

            const card = await cardService.getCardById(req.params.id);

            return response.success(
                res,
                card,
                "Card retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                404
            );

        }
    }

    async getCardByReference(req, res) {
        try {

            const card = await cardService.getCardByReference(
                req.params.reference
            );

            return response.success(
                res,
                card,
                "Card retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                404
            );

        }
    }

    async getCardByNumber(req, res) {
        try {

            const card = await cardService.getCardByNumber(
                req.params.number
            );

            return response.success(
                res,
                card,
                "Card retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                404
            );

        }
    }

    async getCardsByUser(req, res) {
        try {

            const cards = await cardService.getCardsByUser(
                req.params.userId
            );

            return response.success(
                res,
                cards,
                "User cards retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message
            );

        }
    }

    async getCardsByAccount(req, res) {
        try {

            const cards = await cardService.getCardsByAccount(
                req.params.accountId
            );

            return response.success(
                res,
                cards,
                "Account cards retrieved successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message
            );

        }
    }

    async createCard(req, res) {
        try {

            const card = await cardService.createCard(
                req.body
            );

            return response.success(
                res,
                card,
                "Card created successfully.",
                201
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                400
            );

        }
    }

    async updateCard(req, res) {
        try {

            const card = await cardService.updateCard(
                req.params.id,
                req.body
            );

            return response.success(
                res,
                card,
                "Card updated successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                400
            );

        }
    }

    async deleteCard(req, res) {
        try {

            const card = await cardService.deleteCard(
                req.params.id
            );

            return response.success(
                res,
                card,
                "Card deleted successfully."
            );

        } catch (err) {

            return response.error(
                res,
                err.message,
                404
            );

        }
    }

}

module.exports = new CardController();