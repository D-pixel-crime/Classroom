import { model, Schema } from "mongoose";

const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dayAndTime: {
    type: [
      {
        day: {
          type: String,
          required: true,
        },
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export const Classroom = model("Classroom", ClassroomSchema);
