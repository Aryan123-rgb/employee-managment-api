const express = require("express");
const {
  handleSaveAttendance,
  handleGetAttendanceArray,
} = require("../controllers/attendanceController");
const router = express.Router();

router.post("/markPresent", handleSaveAttendance);
router.post("/getAttendance", handleGetAttendanceArray);

module.exports = router;
