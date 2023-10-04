const User = require("../models/User");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const secret = "!@#$%^&*()";

const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email, password });

  if (!userDoc) {
    return res.status(404).json("Invalid credentials entered");
  }

  if (userDoc) {
    jwt.sign(
      {
        id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        password: userDoc.password,
        image: userDoc.image,
        isAdmin: userDoc.isAdmin,
      },
      secret,
      {},
      (err, token) => {
        const response = {
          id: userDoc._id,
          name: userDoc.name,
          email: userDoc.email,
          password: userDoc.password,
          image: userDoc.image,
          token: token,
        };
        res.cookie("token", token).json(response);
      }
    );
  } else res.status(400).json({ error: "Not found" });
};

const handleSignUpUser = async (req, res) => {
  const { name, email, password, image, isAdmin } = req.body;

  const userExist = await User.find({ email });

  if (userExist) {
    return res.status(400).json("Email already exists");
  }

  try {
    const userDoc = await User.create({
      name: name || "",
      email: email || "",
      password: password || "",
      image: image || "",
      isAdmin: isAdmin || "",
    });
    jwt.sign(
      {
        id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        image: userDoc.image,
        isAdmin: userDoc.isAdmin,
      },
      secret,
      {},
      (err, token) => {
        if (err) {
          console.log(err);
          res.status(400).json({ err });
        }
        const response = {
          id: userDoc._id,
          name: userDoc.name,
          email: userDoc.email,
          password: userDoc.password,
          image: userDoc.image,
          isAdmin: userDoc.isAdmin,
          token: token,
        };
        res.cookie("token", token).json(response);
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

const handleGetLoggedInUser = async (req, res) => {
  const token = req?.cookies.token;
  if (req?.cookies.token) {
    const info = jwt.verify(token, secret);
    const id = info?.id;
    const usersData = await User.find({ _id: id });
    res.json(usersData);
  } else {
    res.status(400).json({ error: "Log in required." });
  }
};

const handleGetAllUserInfo = async (req, res) => {
  const token = req?.cookies.token;
  if (!token) {
    return;
  }
  let loggedUserId;
  if (req?.cookies.token) {
    const info = jwt.verify(token, secret);
    loggedUserId = info?.id;
    const userDoc = await User.find({ _id: { $ne: loggedUserId } });
    res.json(userDoc);
  } else {
    res.status(400).json({ error: "Log in required." });
  }
};

module.exports = {
  handleLoginUser,
  handleSignUpUser,
  handleGetLoggedInUser,
  handleGetAllUserInfo,
};