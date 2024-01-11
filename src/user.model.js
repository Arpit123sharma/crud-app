import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema({
    username:String,
    age:Number,
    fullname:String,

},{timestamps:true})

export const User = mongoose.model("User",userSchema);