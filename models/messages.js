const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.set("toJSON", {
  transform: (doc, result) => {
    const id = result._id;
    delete result._id;
    return {
      id,
      ...result,
    };
  },
});

module.exports = mongoose.model("Message", messageSchema);
