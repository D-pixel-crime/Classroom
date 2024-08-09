import bcrypt from "bcryptjs";
import { Teacher } from "../../models/Teacher.js";

export const newTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const encryptedPass = bcrypt.hashSync(password, 10);

    const isPresent = await Teacher.findOne({ email });

    if (isPresent) {
      return res.status(400).json({
        error: "Teacher Already Exists",
      });
    }

    const createdTeacher = await Teacher.create({
      email,
      password: encryptedPass,
    });

    res.status(201).json({
      message: "Teacher Created Successfully",
      teacher: createdTeacher,
    });
  } catch (error) {
    console.log(`Error Creating Teacher: ${error.message}`.bgRed);
    res.status(500).json({
      error: `Error Creating Teacher: ${error.message}`,
    });
  }
};
