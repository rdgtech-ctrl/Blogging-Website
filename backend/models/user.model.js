import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
      // means if you don't provide a value for that field when creating a new document,Mongoose will automatically set it to an empty string instead of leaving it as undefined.
    },
    occupation: {
      type: String,
      default: "",
    },
    photoUrl: {
      type: String,
      default: "",
    },
    instagram: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    facebook: { type: String, default: "" },
  },
  { timestamps: true },
);
// is an option you pass to a Mongoose schema that automatically adds two fields to every document

export const User = mongoose.model("User",userSchema)
