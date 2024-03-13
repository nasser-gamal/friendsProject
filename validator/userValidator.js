const { body, check } = require("express-validator");
const validatorMiddleware = require('../middlewares/validator');



exports.updateUserValidator = [
  body("userName").notEmpty().withMessage("UserName is Requried"),
  validatorMiddleware
];

exports.getUserValidator = [check("userId").isMongoId().withMessage("Invalid id"), validatorMiddleware];
