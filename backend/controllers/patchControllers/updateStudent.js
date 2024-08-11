import { Admin } from "../../models/Admin.js";
import { Student } from "../../models/Student.js";
import bcrypt from "bcryptjs";
import { Teacher } from "../../models/Teacher.js";

export const updateStudent = async (req, res) => {
  const { email, password } = req.body;
  const { userId } = req.cookies;

  try {
    const admin = await Admin.findById(userId);
    const teacher = await Teacher.findById(userId);
    if (!(admin || teacher)) {
      return res.status(404).json({ error: "Unauthorized Access" });
    }

    if (password) {
      const encryptedPass = bcrypt.hashSync(password, 10);
      await Student.findByIdAndUpdate(
        req.params.id,
        { email, password: encryptedPass },
        { new: true }
      );
    } else {
      await Student.findByIdAndUpdate(req.params.id, { email }, { new: true });
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
