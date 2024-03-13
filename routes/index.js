const express = require("express");
const router = express.Router();

const authRoutes = require('./authRoute');
const usersRoutes = require('./userRoute');
const friendsRoutes = require('./friendsRoute');
const messagesRoutes = require('./messageRoute');



router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/friends", friendsRoutes);
router.use("/messages", messagesRoutes);

module.exports = router;
