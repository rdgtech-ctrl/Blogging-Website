import mongoose, { mongo } from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  category: {
    type: String,
  },
  likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
  comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],
  isPublished:{
    type:Boolean,
    default:false
  }
},{timestamps:true});
// ref tells Mongoose which collection to look into when you use .populate()
//ref:"User" go look in User collection
// ref:"Comment" go look in Comment collection


export const Blog = mongoose.model("Blog",blogSchema)