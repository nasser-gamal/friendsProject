const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");
const {
  loginValidator,
  registerValidator,
} = require("../validator/authValidator");
const upload = require("../middlewares/multer");


router.post("/login", loginValidator, login);
router.post("/register", upload.single('image'), registerValidator, register);

module.exports = router;
