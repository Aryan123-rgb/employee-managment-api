const express = require("express");
const {
  handleLoginUser,
  handleSignUpUser,
  handleGetLoggedInUser,
  handleGetAllUserInfo,
} = require("../controllers/userController");
const router = express.Router();

router.post("/login", handleLoginUser);
router.post("/signup", handleSignUpUser);
router.get("/", handleGetLoggedInUser);
router.get("/allUserInfo", handleGetAllUserInfo);

module.exports = router;
