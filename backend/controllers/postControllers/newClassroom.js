import { Admin } from "../../models/Admin.js";
import { Classroom } from "../../models/Classroom.js";

export const newClassroom = async (req, res) => {
  const { name, dayAndTime } = req.body;
  const adminId = req.cookies.userId;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(400).json({
        error: "Unauthorized Access",
      });
    }

    await Classroom.create({ name, dayAndTime });
    res.status(201).json({
      message: "Classroom Created Successfully",
    });
  } catch (error) {
    console.log(`Error Creating Classroom: ${error.message}`.bgRed);
    res.status(500).json({
      error: `Error Creating Classroom: ${error.message}`,
    });
  }
};
