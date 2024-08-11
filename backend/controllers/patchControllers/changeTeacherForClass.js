import { Classroom } from "../../models/Classroom.js";
import { Teacher } from "../../models/Teacher.js";

export const changeTeacherForClass = async (req, res) => {
  const { classId, teacherId, prevTeacherId } = req.body;

  try {
    await Classroom.findByIdAndUpdate(
      classId,
      { teacher: teacherId },
      { new: true }
    );

    if (prevTeacherId) {
      await Teacher.findByIdAndUpdate(
        prevTeacherId,
        { assigned: null },
        { new: true }
      );
    }

    await Teacher.findByIdAndUpdate(
      teacherId,
      { assigned: classId },
      { new: true }
    );

    return res.status(200).json({
      message: "Teacher changed successfully",
    });
  } catch (error) {
    console.log(`Error changing teacher for class: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error changing teacher for class: ${error.message}` });
  }
};
