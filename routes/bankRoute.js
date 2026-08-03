const express = require('express');
const bankController = require('../controller/bankController');
const router = express.Router();

router.post("/create", bankController.createBank);
router.get("/", bankController.getBanks);
router.get("/:id", bankController.getBankById);
router.get("/:id/update", bankController.updateBank);
router.get("/:id/delete", bankController.deleteBank);


module.exports = router;