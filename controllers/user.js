const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { BadRequestError, InternalServerError } = require("../utils/apiError");
const sendResponse = require("../utils/sendResponse");


const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { firebaseConfig } = require("../config/firebase.js");
const firebase = require("firebase/app");

firebase.initializeApp(firebaseConfig);
const storage = getStorage();


exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  sendResponse(res, { data: users });
});


exports.getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError("user not found");
  }
  sendResponse(res, { data: user });
});

exports.getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  sendResponse(res, { data: user });
});



exports.updateUser = asyncHandler(async( req, res) => {
  try {
    const {userName} = req.body;
  const userId = req.user.id;
  const image = req.file ;


  let data = {userName}
  if (image) {
    const storageRef = ref(storage, image.originalname);
    uploadBytes(storageRef, image.buffer).then((snapshot) => {
      // console.log(snapshot)
    });

    const url = await getDownloadURL(storageRef);
    data.image = url;
  }

  const user = await User.findByIdAndUpdate(userId, { ...data }, { new: true });

  if (!user) {
    throw new BadRequestError("user not found");
  }
  sendResponse(res, {message: 'user updated successfully', data: user });
  } catch (err) {
    console.log(err)
  }
});

exports.updateProfileImage = asyncHandler(async(req, res) => {
  const image = req.files;
  const userId = req.user.id;
  const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
  if (!user) {
    throw new BadRequestError("user not found");
  }
  sendResponse(res, { data: user });
});


