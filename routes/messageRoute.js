const express = require("express");
const router = express.Router();

const {
  sendMessage,
  currentUserMessages,
  currentUserSendingMessages,
  deleteMessage,
} = require("../controllers/message");
const {
  sendMessageValidator,
  deleteMessageValidator,
} = require("../validator/messageValidator");


const {protected} = require("../middlewares/auth")

router.use(protected)
router
  .route("/:receiver")
  .post(sendMessageValidator, sendMessage)
  .delete(deleteMessageValidator, deleteMessage);
router.get("/receivingMessages", currentUserMessages);
router.get("/sendingMessages", currentUserSendingMessages);

module.exports = router;
