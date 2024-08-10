import { model, Schema } from "mongoose";

const TeacherSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assigned: {
    type: Schema.Types.ObjectId,
    ref: "Classroom",
  },
});

export const Teacher = model("Teacher", TeacherSchema);
