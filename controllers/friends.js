const asyncHandler = require("express-async-handler");

const User = require("../models/user");

const { InternalServerError } = require("../utils/apiError");
const sendResponse = require("../utils/sendResponse");

exports.getUserFriends = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate({
    path: 'friends',
    select: 'id userName email image '
  });
  sendResponse(res, { data: user.friends });
});

exports.addFriend = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { friendId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { friends: friendId } },
    { new: true }
  );

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }
  sendResponse(res, { data: updatedUser });
});

exports.deleteFriend = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { friendId } = req.params;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { friends: friendId } },
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  sendResponse(res, { data: updatedUser });
});
