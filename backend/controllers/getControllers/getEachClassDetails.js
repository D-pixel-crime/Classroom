import { Classroom } from "../../models/Classroom.js";

export const getEachClassDetails = async (req, res) => {
  const { classId } = req.params;

  try {
    const classDetails = await Classroom.findById(classId)
      .populate("teacher")
      .populate("students");

    if (!classDetails)
      return res.status(404).json({ error: "Class not found" });

    return res.status(200).json({ classDetails });
  } catch (error) {
    console.log(`Error fetching class details: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error fetching class details: ${error.message}` });
  }
};
