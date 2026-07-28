const express = require("express");
const router = express.Router();
const controller = require("../controller/jointAccountController");
const validate = require("../middlewares/userMiddleware");
const jointAccountValidator = require("../validators/jointAccountValidator");

router.post(
    "/create",
    validate(jointAccountValidator.createJointAccountSchema),
    controller.createJointAccount
);

router.get(
    "/all",
    controller.getAllJointAccounts
);

router.get(
    "/:id",
    controller.getJointAccountById
);

router.put(
    "/:id",
    controller.updateJointAccount
);
 
router.delete(
    "/:id",
    controller.deleteJointAccount
);

module.exports = router;