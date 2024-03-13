const asyncHandler = require("express-async-handler");
const Message = require("../models/messages");
const sendResponse = require("../utils/sendResponse");

exports.sendMessage = asyncHandler(async (req, res) => {
  const sender = req.user.id;
  const { receiver } = req.params;
  const { text } = req.body;
  const message = await Message.create({
    text,
    sender,
    receiver,
  });

  sendResponse(res, { data: message });
});

exports.currentUserMessages = asyncHandler(async (req, res) => {
  const receiver = req.user.id;
  const messages = await Message.find({ receiver }).populate({path: "sender", select: 'id userName email image'});
  sendResponse(res, { data: messages });
});

exports.currentUserSendingMessages = asyncHandler(async (req, res) => {
  const sender = req.user.id;
  const messages = await Message.find({ sender }).populate("receiver");
  sendResponse(res, { data: messages });
});

exports.deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const sender = req.user.id;
  const message = await Message.findOneAndDelete({
    _id: messageId,
    sender,
  });
  if (!message) {
    throw new NotFoundError("message not found");
  }
  sendResponse(res, { message: "Message deleted successfully" });
});
