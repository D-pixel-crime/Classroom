import { Teacher } from "../../models/Teacher.js";

export const getTeacherForAssigning = async (req, res) => {
  try {
    const teachers = await Teacher.find(
      { $or: [{ assigned: { $exists: false } }, { assigned: null }] },
      "email _id"
    );
    return res.status(200).json({ teachers });
  } catch (error) {
    console.log(`Error in getTeacherForAssigning: ${error.message}`);
    return res.status(500).json({ error: "Error fetching teachers." });
  }
};
