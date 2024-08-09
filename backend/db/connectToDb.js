import "dotenv/config";
import "colors";
import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${res.connection.host}`.bgCyan);
  } catch (error) {
    console.log(`Error Connecting to Database: ${error.message}`.bgRed);
  }
};
