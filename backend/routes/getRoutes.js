import { Router } from "express";
import { authenticateUser } from "../authenticateUser.js";
import { getClasses } from "../controllers/getControllers/getClasses.js";
import { getEachClassDetails } from "../controllers/getControllers/getEachClassDetails.js";
import { getTeacherForAssigning } from "../controllers/getControllers/getTeacherForAssigning.js";
import { getStudentsForClass } from "../controllers/getControllers/getStudentsForClass.js";
import { getAllTeachers } from "../controllers/getControllers/getAllTeachers.js";
import { getAllStudents } from "../controllers/getControllers/getAllStudents.js";

const getRouter = Router();

getRouter.get("/get-classes", authenticateUser, getClasses);

getRouter.get("/class/:classId", authenticateUser, getEachClassDetails);

getRouter.get("/teachers-for-assign", authenticateUser, getTeacherForAssigning);

getRouter.get(
  "/students-for-class/:classId",
  authenticateUser,
  getStudentsForClass
);

getRouter.get("/all-teachers", authenticateUser, getAllTeachers);

getRouter.get("/all-students", authenticateUser, getAllStudents);

export { getRouter };
