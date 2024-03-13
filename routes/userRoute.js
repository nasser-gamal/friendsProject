const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getCurrentUser,
  updateUser,
  getUserById,
  updateProfileImage,
} = require("../controllers/user");
const {
  updateUserValidator,
  getUserValidator,
} = require("../validator/userValidator");

const upload = require("../middlewares/multer");

const {protected} = require("../middlewares/auth")

router.use(protected)
router.get("/", getAllUsers);
router
  .route("/me")
  .get(getCurrentUser)
  .put(upload.single("image"), updateUserValidator, updateUser);
router.put("/me/image", updateProfileImage);
router.get("/:userId", getUserValidator, getUserById);

module.exports = router;
