import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/crudapp")
        console.log("mongodb connected successfully!!!");
    } catch (err) {
        console.error("error in connecting with mongodb: ",err);
    }
}

export default connectDB;