const express = require("express");
const {
  handleSave,
  handleGetFromCart,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/save", handleSave);
router.post("/get", handleGetFromCart);

module.exports = router;
