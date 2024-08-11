import { Router } from "express";
import { authenticateUser } from "../authenticateUser.js";
import { deleteTeacher } from "../controllers/deleteControllers.tsx/deleteTeacher.js";
import { deleteStudent } from "../controllers/deleteControllers.tsx/deleteStudent.js";

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

export { deleteRouter };
