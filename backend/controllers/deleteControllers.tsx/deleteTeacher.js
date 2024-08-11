import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";
import { Teacher } from "../../models/Teacher.js";

export const deleteTeacher = async (req, res) => {
  const { userId } = req.cookies;
  const { teacherId } = req.params;

  try {
    const isPresent = await Admin.findById(userId);
    if (!isPresent) {
      return res.status(404).json({ error: "Unauthorized Access" });
    }

    await Classroom.updateMany({ assigned: teacherId }, { assigned: null });
    await Teacher.findByIdAndDelete(teacherId);
    return res.status(200).json({ message: "Teacher deleted successfully." });
  } catch (error) {
    console.log(`Error deleting teacher: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error deleting teacher: ${error.message}` });
  }
};
