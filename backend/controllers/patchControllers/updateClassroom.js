import { Classroom } from "../../models/Classroom.js";

export const updateClassroom = async (req, res) => {
  const { name, dayAndTime, teacher, students } = req.body;

  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { name, dayAndTime, teacher, students },
      { new: true }
    )
      .populate("teacher")
      .populate("students");

    return res.status(200).json({
      classDetails: updatedClassroom,
    });
  } catch (error) {
    console.log(`Error Updating Classroom: ${error.message}`.bgRed);
    return res.status(500).json({
      error: `Error Updating Classroom: ${error.message}`,
    });
  }
};
