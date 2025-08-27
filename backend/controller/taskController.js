import Task from "../model/taskModel.js";


export const createTask = async(req,res) =>{
    try{
        const{ title , description } = req.body;
        if(!title || !description){
           return res.status(400).json({message:"Title and Descriptions are imporatnt to mention"});
        }

        const task = new Task({user: req.user._id , title , description});
        const createdTask = await task.save();
        res.status(201).json({message:"Task created sucessfully" ,task: {createdTask}})

    }catch(error){
    res.status(500).json({ message: error.message });

    }

}


// Get all Tasks
export const getTasks = async(req,res) =>{
    try{
        const tasks = await Task.find({user: req.user._id});
        res.status(200).json(tasks);
    }catch(error){
        res.status(500).json({message:error.message ,tasks:{getTasks}});
    }
}

// Get task by id
export const getTaskById =async(req,res) =>{
    try{
        const task = await Task.findById(req.params.id);
        if (task && task.user.toString() === req.user._id.toString()) {
            res.json(task);
    }else{
        res.status(404).json({message:error.message});
    }
}
    catch(error){
        res.status(404).json({ message: "Task not found" });

    } 
    }


    // update task

    export const updateTask = async(req,res) =>{
        try{
            const{ title , description , status} = req.body;
            const task = await Task.findById(req.params.id);
    
            if(task && task.user.toString() === req.user._id.toString()){
                task.title = title || task.title;
                task.description = description || task.description;
                task.status = status || task.status;
                const updatedTask = await task.save();
                res.json(updatedTask);
            }else {
                res.status(404).json({ message: "Task not found" });
              }
        }
      catch(error){
        res.status(500).json({message:error.message})
      }

    }


    export const deleteTask = async (req, res) => {
        try{
            const task = await Task.findById(req.params.id);
            if (task && task.user.toString() === req.user._id.toString()) {
              await task.remove();
              res.json({ message: "Task removed" });
            } else {
              res.status(404).json({ message: "Task not found" });
            }

        }catch(error){
            res.status(500).json({message:error.message})
        }
      
      };