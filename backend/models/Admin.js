import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  email: String,
  password: String,
});

export default model("Admin", AdminSchema);