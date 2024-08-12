import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";

export const updateClassroom = async (req, res) => {
  const { name, dayAndTime, teacher, students } = req.body;
  const { userId } = req.cookies;

  try {
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(401).json({
        error: "Unauthorized access",
      });
    }

    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      { name, dayAndTime, teacher, students },
      { new: true }
    );

    return res.status(200).json({
      message: "Classroom updated successfully",
    });
  } catch (error) {
    console.log(`Error Updating Classroom: ${error.message}`.bgRed);
    return res.status(500).json({
      error: `Error Updating Classroom: ${error.message}`,
    });
  }
};
