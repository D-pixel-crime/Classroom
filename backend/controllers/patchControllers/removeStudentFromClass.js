import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";
import { Student } from "../../models/Student.js";
import { Teacher } from "../../models/Teacher.js";

export const removeStudentFromClass = async (req, res) => {
  const { userId } = req.cookies;
  const { studentId, classId } = req.body;

  try {
    const admin = await Admin.findById(userId);
    const teacher = await Teacher.findById(userId);
    if (!(teacher || admin)) {
      return res.status(404).json({ error: "Unauthorized Access" });
    }

    await Classroom.findByIdAndUpdate(classId, {
      $pull: { students: studentId },
    });
    await Student.findByIdAndUpdate(studentId, {
      $pull: { classrooms: classId },
    });

    return res
      .status(200)
      .json({ message: "Student removed from class successfully." });
  } catch (error) {
    console.log(`Error in removeStudentFromClass: ${error.message}`);
    return res
      .status(500)
      .json({ error: "Error removing student from class." });
  }
};
