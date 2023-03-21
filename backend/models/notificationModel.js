const mongoose = require("mongoose");

const notificationModel = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    notificationContent: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("notification", notificationModel);

module.exports = Notification;
