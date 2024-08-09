import { Student } from "../../models/Student.js";
import bcrypt from "bcryptjs";

export const updateStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const encryptedPass = bcrypt.hashSync(password, 10);

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { email, password: encryptedPass },
      { new: true }
    );

    res.status(200).json({
      message: "Student Updated Successfully",
      Student: updatedStudent,
    });
  } catch (error) {
    console.log(`Error Updating Student: ${error.message}`.bgRed);
    res.status(500).json({
      error: `Error Updating Student: ${error.message}`,
    });
  }
};
