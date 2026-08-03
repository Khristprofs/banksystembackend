const express = require("express");
const branchController = require("../controller/branchController");

const router = express.Router();

router.post("/create", branchController.createBranch);

router.get("/", branchController.getBranches);

router.get("/:id", branchController.getBranchById);

router.get("/bank/:bankId", branchController.getBranchesByBank);

router.get("/name/:name", branchController.getBranchByName);

router.patch("/:id/update", branchController.updateBranch);

router.delete("/:id/delete", branchController.deleteBranch);

module.exports = router;