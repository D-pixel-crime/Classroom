import { Router } from "express";
import { authenticateUser } from "../authenticateUser.js";
import { newTeacher } from "../controllers/postControllers/newTeacher.js";
import { newStudent } from "../controllers/postControllers/newStudent.js";
import { login } from "../controllers/postControllers/login.js";
import { newAdmin } from "../controllers/postControllers/newAdmin.js";

const postRouter = Router();

postRouter.post("/new-admin", newAdmin);

postRouter.post("/new-teacher", authenticateUser, newTeacher);

postRouter.post("/new-student", authenticateUser, newStudent);

postRouter.post("/login", login);

export { postRouter };
