import { model, Schema } from "mongoose";

const StudentSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Student = model("Student", StudentSchema);
