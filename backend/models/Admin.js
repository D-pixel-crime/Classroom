import { model, Schema } from "mongoose";

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Admin = model("Admin", AdminSchema);
