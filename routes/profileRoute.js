const express = require("express");
const router = express.Router();

const profileController = require("../controller/profileController");
const validate = require("../middlewares/userMiddleware");
const profileValidator = require("../validators/profileValidator");


router.post(
  "/create",
  validate(profileValidator.createProfileSchema),
  profileController.createProfile
);

router.get("/all", profileController.getProfiles);
router.get("/:id", profileController.getProfileById);
router.get("/user/:userId", profileController.getProfileByUserId);
router.get("/search/:name", profileController.getProfileByFullName);
router.put("/update/:id", profileController.updateProfile);
router.delete("/delete/:id", profileController.deleteProfile);

module.exports = router;