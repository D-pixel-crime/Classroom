import { Router } from "express";
import { authenticateUser } from "../authenticateUser.js";
import { updateStudent } from "../controllers/patchControllers/updateStudent.js";
import { updateTeacher } from "../controllers/patchControllers/updateTeacher.js";
import { updateClassroom } from "../controllers/patchControllers/updateClassroom.js";
import { changeTeacherForClass } from "../controllers/patchControllers/changeTeacherForClass.js";
import { removeStudentFromClass } from "../controllers/patchControllers/removeStudentFromClass.js";

const patchRouter = Router();

patchRouter.patch("/update-student/:id", authenticateUser, updateStudent);

patchRouter.patch("/update-teacher/:id", authenticateUser, updateTeacher);

patchRouter.patch("/update-classroom/:id", authenticateUser, updateClassroom);

patchRouter.patch("/change-teacher", authenticateUser, changeTeacherForClass);

patchRouter.patch(
  "/remove-student-from-class",
  authenticateUser,
  removeStudentFromClass
);

export { patchRouter };
