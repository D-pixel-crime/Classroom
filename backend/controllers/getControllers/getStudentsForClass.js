import { Student } from "../../models/Student.js";

export const getStudentsForClass = async (req, res) => {
  const { classId } = req.params;
  try {
    const students = await Student.find(
      { classrooms: { $ne: classId } },
      "email _id"
    );

    return res.status(200).json({ students });
  } catch (error) {
    console.log(`Error fetching students for class: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error fetching students for class: ${error.message}` });
  }
};
