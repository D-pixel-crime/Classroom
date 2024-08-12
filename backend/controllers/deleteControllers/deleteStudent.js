import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";
import { Student } from "../../models/Student.js";
import { Teacher } from "../../models/Teacher.js";

export const deleteStudent = async (req, res) => {
  const { userId } = req.cookies;
  const { studentId } = req.params;

  try {
    const admin = await Admin.findById(userId);
    const teacher = await Teacher.findById(userId);
    if (!(admin || teacher)) {
      return res.status(404).json({ error: "Unauthorized Access" });
    }

    await Classroom.updateMany(
      { students: studentId },
      { $pull: { students: studentId } }
    );

    await Student.findByIdAndDelete(studentId);

    return res.status(200).json({ message: "Student deleted successfully." });
  } catch (error) {
    console.log(`Error deleting student: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error deleting student: ${error.message}` });
  }
};
