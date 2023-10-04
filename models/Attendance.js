const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AttendanceArray = new Schema({
  date: { type: String },
  time: { type: String },
});

const AttendanceSchema = new Schema({
  attendanceLog: [AttendanceArray],
  userEmail: { type: String },
});

const AttendanceModel = model("Attendance", AttendanceSchema);

module.exports = AttendanceModel;
