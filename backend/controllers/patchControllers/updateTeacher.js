import { Teacher } from "../../models/Teacher.js";
import bcrypt from "bcryptjs";

export const updateTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const encryptedPass = bcrypt.hashSync(password, 10);

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { email, password: encryptedPass },
      { new: true }
    );

    res.status(200).json({
      message: "Teacher Updated Successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.log(`Error Updating Teacher: ${error.message}`.bgRed);
    res.status(500).json({
      error: `Error Updating Teacher: ${error.message}`,
    });
  }
};
