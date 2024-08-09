import express from "express";
import cors from "cors";
import { connectToDb } from "./db/connectToDb.js";
import cookieParser from "cookie-parser";
import { postRouter } from "./routes/postRoutes.js";
import { getRouter } from "./routes/getRoutes.js";
import morgan from "morgan";

const port = 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLASSROOM_FRONTEND_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();

app.use(morgan("short"));

app.use("/post", postRouter);
app.use("/get", getRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
