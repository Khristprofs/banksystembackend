const express = require('express');
const bankController = require('../controller/bankController');
const router = express.Router();

router.post("/create", bankController.createBank);
router.get("/", bankController.getBanks);
router.get("/:id", bankController.getBankById);
router.put("/:id/update", bankController.updateBank);
router.delete("/:id/delete", bankController.deleteBank);


module.exports = router;