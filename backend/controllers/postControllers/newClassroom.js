import { Classroom } from "../../models/Classroom.js";

export const newClassroom = async (req, res) => {
  const { name, dayAndTime } = req.body;

  try {
    const createdClassroom = await Classroom.create({ name, dayAndTime });
    res.status(201).json({
      message: "Classroom Created Successfully",
      classroom: createdClassroom,
    });
  } catch (error) {
    console.log(`Error Creating Classroom: ${error.message}`.bgRed);
    res.status(500).json({
      message: `Error Creating Classroom: ${error.message}`,
    });
  }
};
