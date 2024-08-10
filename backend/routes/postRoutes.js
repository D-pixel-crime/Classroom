import { Router } from "express";
import { authenticateUser } from "../authenticateUser.js";
import { newTeacher } from "../controllers/postControllers/newTeacher.js";
import { newStudent } from "../controllers/postControllers/newStudent.js";
import { login } from "../controllers/postControllers/login.js";
import { newAdmin } from "../controllers/postControllers/newAdmin.js";
import { newClassroom } from "../controllers/postControllers/newClassroom.js";

const postRouter = Router();

postRouter.post("/new-admin", newAdmin);

postRouter.post("/new-teachers", authenticateUser, newTeacher);

postRouter.post("/new-students", authenticateUser, newStudent);

postRouter.post("/new-classroom", authenticateUser, newClassroom);

postRouter.post("/login", login);

export { postRouter };
