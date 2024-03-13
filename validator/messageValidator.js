const { body, check } = require("express-validator");
const User = require("../models/user");
const { BadRequestError } = require("../utils/apiError");
const validatorMiddleware = require('../middlewares/validator');

exports.sendMessageValidator = [
  check("receiver")
    .isMongoId()
    .withMessage("Invalid Id")
    .custom(async (value, { req }) => {
      const user = await User.findById(value);
      if (!user) {
        throw new BadRequestError("User not found");
      }
      return true;
    }),
  body("text").notEmpty().withMessage("Text Message is required"),
  validatorMiddleware
];

exports.deleteMessageValidator = [
  check("messageId").isMongoId().withMessage("Invalid Id"),
  validatorMiddleware
];
