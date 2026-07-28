const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const validate = require("../middlewares/userMiddleware");
const userValidator = require("../validators/userValidator");


router.post(
    "/create",
    validate(userValidator.createUserSchema),
    userController.createUser
);
router.get("/all", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put(
    "/update/:id",
    validate(userValidator.updateUserSchema),
    userController.updateUser
);
router.delete("/delete/:id", userController.deleteUser);


module.exports = router;