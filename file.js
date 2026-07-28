const JointAccount = require("./jointAccount.model");

exports.verifyJointMember = async (req, res, next) => {

    const joint = await JointAccount.findById(req.params.id);

    const isMember = joint.users.some(
        u => u.userId.toString() === req.user.id
    );

    if (!isMember) {
        return res.status(403).json({
            message: "Not authorized for this joint account"
        });
    }

    next();

};

const service = require("./jointAccount.service");

exports.createJointAccount = async (req,res,next)=>{
  try{

    const joint = await service.createJointAccount(req.body);

    res.status(201).json({
      success:true,
      data:joint
    });

  }catch(err){next(err)}
};


exports.getAllJointAccounts = async (req,res,next)=>{
  try{

    const data = await service.getAllJointAccounts();

    res.json({success:true,data});

  }catch(err){next(err)}
};


exports.getJointAccountById = async (req,res,next)=>{
  try{

    const data = await service.getJointAccountById(req.params.id);

    res.json({success:true,data});

  }catch(err){next(err)}
};


exports.getJointAccountsByBranch = async (req,res,next)=>{
  try{

    const data = await service.getJointAccountsByBranch(
      req.params.branchId
    );

    res.json({success:true,data});

  }catch(err){next(err)}
};


exports.getJointAccountsByType = async (req,res,next)=>{
  try{

    const data = await service.getJointAccountsByType(
      req.params.type
    );

    res.json({success:true,data});

  }catch(err){next(err)}
};


exports.getJointAccountsByName = async (req,res,next)=>{
  try{

    const data = await service.getJointAccountsByName(
      req.query.name
    );

    res.json({success:true,data});

  }catch(err){next(err)}
};


exports.updateJointAccount = async (req,res,next)=>{
  try{

    const data = await service.updateJointAccount(
      req.params.id,
      req.body
    );

    res.json({success:true,data});

  }catch(err){next(err)}
};


exports.deleteJointAccount = async (req,res,next)=>{
  try{

    await service.deleteJointAccount(req.params.id);

    res.json({
      success:true,
      message:"Joint account deleted"
    });

  }catch(err){next(err)}
};

const router = require("express").Router();

const controller = require("./jointAccount.controller");
const validator = require("./jointAccount.validator");
const middleware = require("./jointAccount.middleware");

const validate = require("../../middlewares/validate");

router.post(
  "/",
  validate(validator.createJointAccountSchema),
  controller.createJointAccount
);

router.get("/", controller.getAllJointAccounts);

router.get("/name", controller.getJointAccountsByName);

router.get("/type/:type", controller.getJointAccountsByType);

router.get("/branch/:branchId", controller.getJointAccountsByBranch);

router.get(
  "/:id",
  middleware.verifyJointMember,
  controller.getJointAccountById
);

router.put(
  "/:id",
  validate(validator.updateJointAccountSchema),
  controller.updateJointAccount
);

router.delete("/:id", controller.deleteJointAccount);

module.exports = router;