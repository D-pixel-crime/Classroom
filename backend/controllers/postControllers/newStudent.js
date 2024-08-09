import bcrypt from "bcryptjs";
import { Student } from "../../models/Student.js";

export const newStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const encryptedPass = bcrypt.hashSync(password, 10);

    const isPresent = await Student.findOne({ email });

    if (isPresent) {
      return res.status(400).json({
        error: "Student Already Exists",
      });
    }

    const createStudent = await Student.create({
      email,
      password: encryptedPass,
    });

    res.status(201).json({
      message: "Student Created Successfully",
      teacher: createStudent,
    });
  } catch (error) {
    console.log(`Error Creating Student: ${error.message}`.bgRed);
    res.status(500).json({
      error: `Error Creating Student: ${error.message}`,
    });
  }
};
