import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        status:{
            type:String,
            enum:["Pending" , "Completed"],
            default:"Pending"
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamp:true}
)

const Task = mongoose.model("Task" , taskSchema);
export default Task;