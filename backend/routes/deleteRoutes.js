import { Router } from "express";
import { authenticateUser } from "../authenticateUser.js";
import { deleteTeacher } from "../controllers/deleteControllers/deleteTeacher.js";
import { deleteStudent } from "../controllers/deleteControllers/deleteStudent.js";
import { deleteClassroom } from "../controllers/deleteControllers/deleteClassroom.js";

const deleteRouter = Router();

deleteRouter.delete(
  "/delete-teacher/:teacherId",
  authenticateUser,
  deleteTeacher
);

deleteRouter.delete(
  "/delete-student/:studentId",
  authenticateUser,
  deleteStudent
);

deleteRouter.delete(
  "/delete-classroom/:classId",
  authenticateUser,
  deleteClassroom
);

export { deleteRouter };
