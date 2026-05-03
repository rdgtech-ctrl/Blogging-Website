import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        content:{
            type:String,
            required:true,
        },
        postId:{
            type:mongoose.Schema.Types.objectId,
            ref:"Blog"
        },
        userId:{
            type:mongoose.Schema.Types.objectId,
            ref:'User'
        },
        likes:{
            type:Array,
            default:[]
        },
        numberOfLikes:{
            type:Number,
            default:0
        }
    },
    {timestamps:true}
)

const Comment = mongoose.model("Comment",commentSchema)
export default Comment;