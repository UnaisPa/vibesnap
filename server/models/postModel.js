import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        required:true
    },
    mediaUrls:[{
        type:String
    }],
    likes:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

const Post = mongoose.model('Post',postSchema);
export default Post