import  express  from "express";
import connectDB from "./db.connection.js";
import {createUser,readUser,updateUser,deletUser} from "./user.controller.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const server = express();

server.use(cors({
    origin: "*",
    credentials:true
}))

server.use(express.json({
    limit:"16kb"
}))

server.use(express.urlencoded({extended:true,limit:"16kb"}))
server.use(express.static("public"))

server.use(cookieParser())

server.get("/",(req,res)=>{
    res.send("server is ready!!")
})
server.post("/api/users/create",createUser)
server.get("/api/users/find",readUser)
server.put("/api/users/update",updateUser)
server.delete("/api/users/delet",deletUser)

connectDB()
.then(()=>{
    server.listen(3000,()=>{
        console.log("server is listing on port 3000");
    })
})
.catch((err)=>{
    console.log("error in connection: ",err);
})