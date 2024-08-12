import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";
import { Student } from "../../models/Student.js";
import { Teacher } from "../../models/Teacher.js";

export const deleteClassroom = async (req, res) => {
  const { classId } = req.params;
  const { userId } = req.cookies;

  try {
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(401).json({
        error: "Unauthorized access",
      });
    }

    const classroom = await Classroom.findById(classId);
    if (!classroom) {
      return res.status(404).json({
        error: "Classroom not found",
      });
    }

    await Teacher.findByIdAndUpdate(classroom.teacher, { assigned: null });

    for (const eachStudent of classroom.students) {
      await Student.findByIdAndUpdate(eachStudent, {
        $pull: { classrooms: classId },
      });
    }

    await Classroom.findByIdAndDelete(classId);

    return res.status(200).json({
      message: "Classroom deleted successfully",
    });
  } catch (error) {
    console.log(`Error deleting classroom: ${error}`);
    return res.status(500).json({
      error: `Error deleting classroom: ${error}`,
    });
  }
};
