import bcrypt from "bcryptjs";
import { Student } from "../../models/Student.js";
import jwt from "jsonwebtoken";
import { Teacher } from "../../models/Teacher.js";
import { Admin } from "../../models/Admin.js";
import mongoose from "mongoose";

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  console.log(email, password, role);

  try {
    let isPresent;
    switch (role) {
      case "Student":
        isPresent = await Student.findOne({ email });
        break;

      case "Teacher":
        isPresent = await Teacher.findOne({ email });
        break;

      case "Admin":
        isPresent = await Admin.findOne({ email });
        break;
    }

    if (!isPresent) {
      return res.status(400).json({
        error: `${role} Not Found`,
      });
    }

    const passOk = bcrypt.compareSync(password, isPresent.password);
    if (!passOk) {
      return res.status(400).json({
        error: "Incorrect Password",
      });
    }

    const token = jwt.sign({ id: isPresent._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    const stringUserId = new mongoose.Types.ObjectId(isPresent._id).toString();

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    res.cookie("role", role, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });
    res.cookie("userId", stringUserId, {
      maxAge: 1000 * 60 * 60 * 24 * 3,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(`Error Logging In: ${error.message}`.bgRed);
    return res.status(500).json({
      error: `Error Logging In: ${error.message}`,
    });
  }
};
