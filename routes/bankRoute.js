const express = require('express');
const bankController = require('../controller/bankController');
const router = express.Router();

router.post("/create", bankController.creatBank);
router.get("/all", bankController.getBanks);
router.get("/:id", bankController.getBankById);
router.get("/name/:name", bankController.getBankByName)
router.get("/:id/update", bankController.updateBank);


module.exports = router;