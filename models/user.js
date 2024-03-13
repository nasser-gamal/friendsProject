const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ]
  },
  {
    timestamps: true,
  }
);

userSchema.set("toJSON", {
  transform: (doc, result) => {
    const id = result._id;
    delete result._id;
    delete result.password;
    return {
      id,
      ...result,
    };
  },
});

module.exports = mongoose.model("User", userSchema);
