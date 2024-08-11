import { Admin } from "../../models/Admin.js";
import { Teacher } from "../../models/Teacher.js";

export const getAllTeachers = async (req, res) => {
  const { userId } = req.cookies;

  try {
    const isPresent = await Admin.findById(userId);
    if (!isPresent) {
      return res.status(404).json({ error: "Unauthorized Access" });
    }

    const teachers = await Teacher.find({}, "email _id");
    return res.status(200).json({ teachers });
  } catch (error) {
    console.log(`Error fetching teachers: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error fetching teachers: ${error.message}` });
  }
};
