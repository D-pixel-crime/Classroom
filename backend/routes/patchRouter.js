import { Router } from "express";
import { authenticateUser } from "../authenticateUser.js";
import { updateStudent } from "../controllers/patchControllers/updateStudent.js";
import { updateTeacher } from "../controllers/patchControllers/updateTeacher.js";
import { updateClassroom } from "../controllers/patchControllers/updateClassroom.js";

const patchRouter = Router();

patchRouter.patch("/update-student/:id", authenticateUser, updateStudent);

patchRouter.patch("/update-teacher/:id", authenticateUser, updateTeacher);

patchRouter.patch("/update-classroom/:id", authenticateUser, updateClassroom);

export { patchRouter };
