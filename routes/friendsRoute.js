const express = require("express");
const router = express.Router();

const {
  getUserFriends,
  addFriend,
  deleteFriend,
} = require("../controllers/friends");
const {
  addFriendValidator,
  deleteFriendValidator,
} = require("../validator/friendsValidator");

const {protected} = require("../middlewares/auth")

router.use(protected)
router.get("/", getUserFriends);
router
  .route("/:friendId")
  .post(addFriendValidator, addFriend)
  .delete(deleteFriendValidator, deleteFriend);

module.exports = router;
