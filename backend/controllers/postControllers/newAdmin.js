import { Admin } from "../../models/Admin.js";
import bcrypt from "bcryptjs";

export const newAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const encryptedPass = bcrypt.hashSync(password, 10);

    const isPresent = await Admin.findOne({ email });

    if (isPresent) {
      return res.status(400).json({ message: "Admin Already Exists" });
    }

    const createAdmin = await Admin.create({
      email,
      password: encryptedPass,
    });

    res
      .status(201)
      .json({ message: "Admin Created Successfully", admin: createAdmin });
  } catch (error) {
    console.log(`Error Creating Admin: ${error.message}`.bgRed);
    res.status(500).json({ message: `Error Creating Admin: ${error.message}` });
  }
};
