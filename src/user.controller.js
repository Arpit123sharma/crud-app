import { User } from "./user.model.js"
//import {AsyncHandler} from "./async.utils.js"
const createUser = async (req,res)=>{
    try {
        if (!req.body) {
            console.error("Request body is undefined");
            return res.status(400).json({ error: "Invalid request body" });
         }

        const {userName ,Age, fullName} =  req.body
        console.log(userName);
        if(!userName || !Age || !fullName){
            console.error("every field is required!!")
        }
        const user = await User.create({
            username : userName,
            age : Age,
            fullname : fullName
        })
        const userCreated = await User.findById(user.id)
        if(!userCreated){
            console.error("user was not created")
        }
        return res.status(200)
        .json( userCreated )
    } catch (error) {
        console.log("something went wrong: ",error);
    }
}
const readUser = async (req,res)=>{
    try {
        const {_id} = req.query
        if (!_id) {
            return res.status(400)
            .json({
                message:"pls send the user id"
            })
        }
        const user = await User.findById(_id)
        if (!user) {
            return res.status(500)
            .json({
                message:"user not found"
            }) 
        }
        return res.status(200)
        .json(user)
    } catch (err) {
        return res.status(500)
        .json({
            error:`something went in server: ${err}`
        })
    }
}
const updateUser = async(req,res)=>{
     try {
        const {_id} = req.query
        if (!_id) {
            return res.status(400)
                .json({
                    message:"pls send the user id"
                })
        }
        const fields = req.body
        
        if (!fields) {
            return res.status(400)
                .json({
                    message:"pls send atleast on field "
                })
        }
        const user = await User.findByIdAndUpdate(_id,fields,{new:true})
        if (!user) {
            return res.status(500)
                .json({
                    message:"user was not updated"
                })
        }
        return res.status(200)
        .json(user)
     } catch (error) {
        return res.status(500)
        .json({
            message:"something went wrong with server"
        })
     }
}
const deletUser = async(req,res)=>{
    try {
        const {_id} = req.query
        if (!_id) {
            return res.status(400)
                .json({
                    message:"pls send the user id"
                })
        }
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(500).json({
                message:`user was not deleted: ${error}`
            })
        }
        return res.status(200)
        .json({
            message:"user deleted successfully!!!",
            USER:user
        })
    } 
    catch (error) {
        return res.status(500)
        .json({
            message:`delet was unsuccessfull: ${error}`
        })
    }
}
export {createUser,readUser,updateUser,deletUser}