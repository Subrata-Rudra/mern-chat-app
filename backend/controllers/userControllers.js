const expressAsyncHandler = require("express-async-handler"); //this package will handle errors
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//this is for registering the user
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email }); //findone query will check that the email exists in the database or not

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    //this will store the data into database
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

//this is for authenticating the user
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if ((user, await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//this is for returning the users' list to the user who requested for the users' list
const allUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        //The $or operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>.
        $or: [
          { name: { $regex: req.query.search, $options: "i" } }, //$regex provides regular expression capabilities for pattern matching strings in queries.
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); //it is the query to get all the users except the user who is seraching
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
