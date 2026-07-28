const express = require("express");
const branchController = require("../controller/branchController");
const router = express.Router();


router.post("/create", branchController.createBranch);
router.get("/all", branchController.getBranches);
router.get("/:id", branchController.getBranchById);
router.get("/bank/:bankId", branchController.getBranchesByBank);
router.get("/name/:name", branchController.getBranchByName);
router.put("/update/:id", branchController.updateBranch);
router.delete("/delete/:id", branchController.deleteBranch);


module.exports = router;