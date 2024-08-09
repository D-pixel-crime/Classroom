import { Classroom } from "../../models/Classroom.js";

export const updateClassroom = async (req, res) => {
  const { name, dayAndTime, teacher, students } = req.body;

  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { name, dayAndTime, teacher, students },
      { new: true }
    );

    res.status(200).json({
      message: "Classroom Updated Successfully",
      Classroom: updatedClassroom,
    });
  } catch (error) {
    console.log(`Error Updating Classroom: ${error.message}`.bgRed);
    res.status(500).json({
      error: `Error Updating Classroom: ${error.message}`,
    });
  }
};
