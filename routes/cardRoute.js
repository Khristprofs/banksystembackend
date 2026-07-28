const express = require("express");
const router = express.Router();

const cardController = require("../controller/cardController");

const validate = require("../middlewares/validate");

const {
    createCardSchema,
    updateCardSchema,
} = require("../validators/cardValidator");

/*
|--------------------------------------------------------------------------
| Cards
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    cardController.getAllCards
);

router.get(
    "/bank/:bankId",
    cardController.getCardsByBank
);

router.get(
    "/branch/:branchId",
    cardController.getCardsByBranch
);

router.get(
    "/user/:userId",
    cardController.getCardsByUser
);

router.get(
    "/account/:accountId",
    cardController.getCardsByAccount
);

router.get(
    "/reference/:reference",
    cardController.getCardByReference
);

router.get(
    "/number/:number",
    cardController.getCardByNumber
);

router.get(
    "/:id",
    cardController.getCardById
);

router.post(
    "/create",
    validate(createCardSchema),
    cardController.createCard
);

router.put(
    "/:id",
    validate(updateCardSchema),
    cardController.updateCard
);

router.delete(
    "/:id",
    cardController.deleteCard
);

module.exports = router;