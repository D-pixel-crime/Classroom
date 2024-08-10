import bcrypt from "bcryptjs";
import { Teacher } from "../../models/Teacher.js";
import { Admin } from "../../models/Admin.js";
import { Student } from "../../models/Student.js";

export const newStudent = async (req, res) => {
  const userId = req.cookies.userId;

  const { students } = req.body;

  try {
    const admin = await Admin.findById(userId);
    const teacher = await Teacher.findById(userId);
    if (!admin && !teacher) {
      return res.status(400).json({
        error: "Unauthorized Access",
      });
    }

    for (const eachStudent of students) {
      const { email, password } = eachStudent;
      const isPresent = await Student.findOne({ email });
      if (isPresent) {
        return res.status(400).json({
          error: `${email} Already Exists`,
        });
      }

      const encyptedPass = bcrypt.hashSync(password, 10);

      await Student.create({
        email,
        password: encyptedPass,
      });
    }

    return res.status(201).json({
      message: "Students Created Successfully",
    });
  } catch (error) {
    console.log(`Error Creating Student: ${error.message}`.bgRed);
    return res.status(500).json({
      error: `Error Creating Student: ${error.message}`,
    });
  }
};
