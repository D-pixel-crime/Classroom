import { Admin } from "../../models/Admin.js";
import { Student } from "../../models/Student.js";
import { Teacher } from "../../models/Teacher.js";

export const getAllStudents = async (req, res) => {
  const { userId } = req.cookies;

  try {
    const admin = await Admin.findById(userId);
    const teacher = await Teacher.findById(userId);
    if (!(admin || teacher)) {
      return res.status(404).json({ error: "Unauthorized Access" });
    }

    const students = await Student.find({}, "email _id");
    return res.status(200).json({ students });
  } catch (error) {
    console.log(`Error fetching students: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error fetching students: ${error.message}` });
  }
};
