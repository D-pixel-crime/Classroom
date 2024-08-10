import bcrypt from "bcryptjs";
import { Teacher } from "../../models/Teacher.js";
import { Admin } from "../../models/Admin.js";

export const newTeacher = async (req, res) => {
  const adminId = req.cookies.userId;

  const { teachers } = req.body;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        error: "Unauthorized Access",
      });
    }

    for (const eachTeacher of teachers) {
      const { email, password } = eachTeacher;
      const isPresent = await Teacher.findOne({ email });
      if (isPresent) {
        return res.status(400).json({
          error: `${email} Already Exists`,
        });
      }

      const encyptedPass = bcrypt.hashSync(password, 10);

      await Teacher.create({
        email,
        password: encyptedPass,
      });
    }

    return res.status(201).json({
      message: "Teachers Created Successfully",
    });
  } catch (error) {
    console.log(`Error Creating Teacher: ${error.message}`.bgRed);
    return res.status(500).json({
      error: `Error Creating Teacher: ${error.message}`,
    });
  }
};
