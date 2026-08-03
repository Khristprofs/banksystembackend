const express = require('express');
const bankController = require('../controller/bankController');
const router = express.Router();

router.post("/create", bankController.creatBank);
router.get("/", bankController.getBanks);
router.get("/:id", bankController.getBankById);
router.get("/:id/delete", bankController.getBankByName)
router.get("/:id/update", bankController.updateBank);


module.exports = router;