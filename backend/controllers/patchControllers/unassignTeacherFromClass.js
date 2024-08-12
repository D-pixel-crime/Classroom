import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";
import { Teacher } from "../../models/Teacher.js";

export const unassignTeacherFromClass = async (req, res) => {
  const { userId } = req.cookies;
  const { classId } = req.params;
  const { teacherId } = req.body;

  try {
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(401).json({
        error: "Unauthorized access",
      });
    }

    if (teacherId) {
      await Teacher.findByIdAndUpdate(teacherId, { assigned: null });
      await Classroom.findByIdAndUpdate(classId, { teacher: null });
    }

    return res.status(200).json({
      message: "Teacher un-assigned from class successfully",
    });
  } catch (error) {
    console.log(`Error un-assigning teacher from class: ${error}`);
    return res.status(500).json({
      error: `Error un-assigning teacher from class: ${error}`,
    });
  }
};
