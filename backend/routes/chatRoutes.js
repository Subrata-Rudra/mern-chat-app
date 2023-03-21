const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, accessChat); //this route is for creating chat(if not created before) and accessing chat(if chat already created before)
router.route("/").get(protect, fetchChats); //this route is for fetching all the chats from the database
router.route("/group").post(protect, createGroupChat); //this route is for creating group chat
router.route("/rename").put(protect, renameGroup); //this route is for renaming group chat by updating the group name
router.route("/groupadd").put(protect, addToGroup); //this route is for adding someone to the group chat by updating the users' list by adding the user to the list
router.route("/groupremove").put(protect, removeFromGroup); //this route is for removing someone from the group chat by updating the users' list by removing the user from the list

module.exports = router;
