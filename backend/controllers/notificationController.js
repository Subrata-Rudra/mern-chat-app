const expressAsyncHandler = require("express-async-handler");
const Notification = require("../models/notificationModel");

const sendNotification = expressAsyncHandler(async (req, res) => {
  const { userId, newMsg } = req.body;

  if (!userId || !newMsg) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newNotification = {
    userId: userId,
    sender: newMsg.sender._id,
    chat: newMsg.chat._id,
    notificationContent: newMsg.content,
  };

  try {
    // var notif = await Notification.create(newNotification);

    /*************************add*************************** */
    var notif = await Notification.create(newNotification)
    .populate("sender", "name pic email")
    .populate({
      path: "chat",
      populate: {
        path: "users",
      },
    });
    console.log("From notificationController.js, at line 32, Notif is -->");
    console.log(notif);
    res.json(notif);
    /*************************add*************************** */
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allNotifications = expressAsyncHandler(async (req, res) => {
  try {
    // const notifications = await Notification.find({
    //   userId: req.params.userId,
    // })
    //   .populate("sender", "name pic email")
    //   .populate("chat");

    //*******************add-1******************* */
    // const notifications = await Notification.find({
    //   userId: req.params.userId,
    // })
    //   .populate("sender", "name pic email")
    //   .populate({
    //     path: "chat",
    //     populate: {
    //       path: "users",
    //     },
    //   });
    //*******************add-1******************* */

    //*******************add-2******************* */
    const notifications = await Notification.find({
      userId: req.params.userId,
    })
      .populate("sender", "name pic email")
      .populate({
        path: "chat",
        populate: {
          path: "users groupAdmin",
        },
      });
    //*******************add-2******************* */

    res.json(notifications);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteNotification = expressAsyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;
  try {
    Notification.deleteMany({ userId: userId, chat: chatId }, (error) => {});
    res.json({ Message: "Deleted all those notifications from database." });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendNotification, allNotifications, deleteNotification };
