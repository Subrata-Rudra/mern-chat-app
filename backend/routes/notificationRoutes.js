const express = require("express");
const {
  sendNotification,
  allNotifications,
  deleteNotification,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, sendNotification); //this route is for sending notification to server to store in the database
router.route("/all/:userId").get(protect, allNotifications); //this route is for fetching all notification from server and send to the specific user
router.route("/delete").post(protect, deleteNotification); //this route is for deleting all notification from server which was sent by same sender

module.exports = router;
