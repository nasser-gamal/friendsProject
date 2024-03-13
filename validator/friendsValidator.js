const { body, check } = require("express-validator");
const User = require("../models/user");
const { BadRequestError } = require("../utils/apiError");
const validatorMiddleware = require('../middlewares/validator');




exports.addFriendValidator = [
    check('friendId').isMongoId().withMessage('Invalid Id').custom(async (value, {req}) => {
        const user = await User.findById(value);
        if (!user) {
            throw new BadRequestError('User not found');
        }
        return true 
    }),
    validatorMiddleware
]

exports.deleteFriendValidator = [
    check('friendId').isMongoId().withMessage('Invalid Id').custom(async (value, {req}) => {
        const user = await User.findById(value);
        if (!user) {
            throw new BadRequestError('User not found');
        }
        return true 
    }),
    validatorMiddleware
];

