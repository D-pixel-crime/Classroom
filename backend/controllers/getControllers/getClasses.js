import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";
import { Student } from "../../models/Student.js";
import { Teacher } from "../../models/Teacher.js";

export const getClasses = async (req, res) => {
  const { userId, role } = req.cookies;

  try {
    let classes;
    let isPresent;
    switch (role) {
      case "Admin" || "admin":
        isPresent = await Admin.findById(userId);
        if (!isPresent) {
          return res.status(404).json({ error: "Unauthorized Access" });
        }
        classes = await Classroom.find({}, "name _id");
        break;

      case "Teacher" || "teacher":
        isPresent = await Teacher.findById(userId);
        if (!isPresent) {
          return res.status(404).json({ error: "Unauthorized Access" });
        }
        classes = await Classroom.find({ teacher: userId }, "name _id");
        break;

      case "Student" || "student":
        isPresent = await Student.findById(userId);
        if (!isPresent) {
          return res.status(404).json({ error: "Unauthorized Access" });
        }
        classes = await Classroom.find({ students: userId }, "name _id");
        break;

      default:
        return res.status(404).json({ error: "Unauthorized" });
    }

    return res.status(200).json({ classes });
  } catch (error) {
    console.log(`Error fetching classes: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error fetching classes: ${error.message}` });
  }
};
