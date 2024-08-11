import { Admin } from "../../models/Admin.js";
import { Teacher } from "../../models/Teacher.js";
import bcrypt from "bcryptjs";

export const updateTeacher = async (req, res) => {
  const { email, password } = req.body;
  const { userId } = req.cookies;

  try {
    const isPresent = await Admin.findById(userId);
    if (!isPresent) {
      return res.status(404).json({ error: "Unauthorized Access" });
    }

    if (password != "") {
      const encryptedPass = bcrypt.hashSync(password, 10);
      await Teacher.findByIdAndUpdate(
        req.params.id,
        { email, password: encryptedPass },
        { new: true }
      );
    } else {
      await Teacher.findByIdAndUpdate(req.params.id, { email }, { new: true });
    }

    return res.status(200).json({
      message: "Teacher Updated Successfully",
    });
  } catch (error) {
    console.log(`Error Updating Teacher: ${error.message}`.bgRed);
    return res.status(500).json({
      error: `Error Updating Teacher: ${error.message}`,
    });
  }
};
