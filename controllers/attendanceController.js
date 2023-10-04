const Attendance = require("../models/Attendance");

const handleSaveAttendance = async (req, res) => {
  const { attendanceRecord, email } = req.body;

  try {
    const existingAttendanceRecord = await Attendance.findOneAndUpdate(
      { userEmail: email },
      { attendanceLog: attendanceRecord },
      { new: true, upsert: true }
    );
    return res.json(existingAttendanceRecord)
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const handleGetAttendanceArray = async (req, res) => {
  const { email } = req.body;
  try {
    const attendanceDoc = await Attendance.find({ userEmail: email });
    return res.json(attendanceDoc || []);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = { handleSaveAttendance, handleGetAttendanceArray };
