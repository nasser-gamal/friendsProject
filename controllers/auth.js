const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { BadRequestError } = require("../utils/apiError");
const User = require("../models/user");
const sendResponse = require("../utils/sendResponse");

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { firebaseConfig } = require("../config/firebase.js");
const firebase = require("firebase/app");
const generateToken = require('../utils/generateToken')

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    console.log('user not found')
    throw new BadRequestError("Inavlid Credinatals");
  }

  const comparePassword = await bcrypt.compare( password, user.password);
  if (!comparePassword) {
    console.log('password wrong')
    throw new BadRequestError("Inavlid Credinatals");
  }

  user.password = null;
  const { token } = generateToken(user);
  sendResponse(res, { data: { user, token } });
});

exports.register = asyncHandler(async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const image = req.file;
  
    let imageUrl = "";
    if (image) {
      const storageRef = ref(storage, image.originalname);
      uploadBytes(storageRef, image.buffer).then((snapshot) => {
        // console.log(snapshot)
      });
  
      const url = await getDownloadURL(storageRef);
      imageUrl = url;
    }
  
    const hashPassword = await bcrypt.hash(password, 12);
  
    const user = await User.create({
      userName,
      email,
      password: hashPassword,
      image: imageUrl,
    });
  
    const { token } = generateToken(user);
  
    sendResponse(res, {message: 'account created successfully', data: { user, token } });
  } catch (err) {
    console.log(err)
  }
});
