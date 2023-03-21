const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers); //here "protect" is a authentication middleware, which authenticate the user by the jwt token
router.post("/login", authUser);

module.exports = router;
