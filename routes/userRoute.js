const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const validate = require("../middlewares/userMiddleware");
const userValidator = require("../validators/userValidator");

// Create
router.post(
    "/create",
    validate(userValidator.createUserSchema),
    userController.createUser
);

// Get all
router.get("/", userController.getUsers);

// Get one
router.get("/:id", userController.getUserById);

// Update
router.put(
    "/:id/update",
    validate(userValidator.updateUserSchema),
    userController.updateUser
);

// Change role
router.patch(
    "/:id/role",
    userController.changeUserRole
);

// Change status
router.patch(
    "/:id/status",
    userController.changeUserStatus
);

// Delete
router.delete(
    "/:id/delete",
    userController.deleteUser
);

module.exports = router;