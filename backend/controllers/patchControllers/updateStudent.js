import { Student } from "../../models/Student.js";
import bcrypt from "bcryptjs";

export const updateStudent = async (req, res) => {
  const { email, classrooms } = req.body;
  let password = null;
  if (req.body.password) password = req.body.password;

  try {
    let encryptedPass;
    if (password) encryptedPass = bcrypt.hashSync(password, 10);

    let updatedStudent;

    if (password)
      updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { email, password: encryptedPass },
        { new: true }
      );
    else {
      updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { email, classrooms },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Student Updated Successfully",
    });
  } catch (error) {
    console.log(`Error Updating Student: ${error.message}`.bgRed);
    res.status(500).json({
      error: `Error Updating Student: ${error.message}`,
    });
  }
};
