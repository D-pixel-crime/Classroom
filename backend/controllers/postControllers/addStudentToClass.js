import { Classroom } from "../../models/Classroom.js";
import { Student } from "../../models/Student.js";

export const addStudentToClass = async (req, res) => {
  const { classId, studentId } = req.body;

  try {
    await Classroom.findByIdAndUpdate(
      classId,
      { $push: { students: studentId } },
      { new: true }
    );

    await Student.findByIdAndUpdate(
      studentId,
      { $push: { classrooms: classId } },
      { new: true }
    );

    res.status(200).json({
      message: "Student added to class successfully",
    });
  } catch (error) {
    console.log(`Error adding student to class: ${error.message}`);
    return res
      .status(500)
      .json({ error: `Error adding student to class: ${error.message}` });
  }
};
