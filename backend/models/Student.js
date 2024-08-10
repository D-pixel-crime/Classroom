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
  classrooms: {
    type: [Schema.Types.ObjectId],
    ref: "Classroom",
  },
});

export const Student = model("Student", StudentSchema);
