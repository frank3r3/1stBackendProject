const TaskModel = require("../Models/TaskModel");

const GetAllTask = async(request,response) =>{
    try {
        const result = await TaskModel.find().sort({createdAt:-1});
    response.status(200).json(result); 
    } catch (error) {
       response.status(404).json({
        message:"failed to fetch data",
       }); 
    }
};


const GetSingleTask = async(request,response) =>{
    const {id} = request.params
    try {
        const result = await TaskModel.findById(id)
    if(!result){
        return response.status(407).json({
            message: `Task ${id} not found`
        });
    }else {
        response.status(200).json(result)
    }
     } catch (error) {
       response.status(404).json({
        message:"failed to fetch data",
       }); 
    }
};


const updateSingleTask = async(request,response) =>{
    const {id} = request.params
    const {title, assignedTo, description, startDate, endDate, projectLink, isCompleted,status} = request.body;
    try {
        const result = await TaskModel.findById(id)
    if(!result){
        return response.status(407).json({
            message: `Task ${id} not found`
        })
    }else {
        result.title = title || result.title;
        result.assignedTo = assignedTo || result.assignedTo;
        result.description = description || result.description;
        result.startDate = startDate || result.startDate;
        result.endDate = endDate || result.endDate;
        result.projectLink = projectLink || result.projectLink;
        result.isCompleted = isCompleted || result.isCompleted;
        result.status = status || result.status;
        await result.save();
        response.status(200).json(result)
    }
     } catch (error) {
       response.status(404).json({
        message:"failed to fetch data",
       }); 
    }
};



const DeleteSingleTask = async(request,response) =>{
    const {id} = request.params
    try {
        const result = await TaskModel.findByIdAndDelete(id);
    if(!result){
        return response.status(408).json({
            message: `Task ${id} not found`
        });
    }else {
        response.status(200).json({
        message:"Task ID deleted successfully",
       });
    }
     } catch (error) {
       response.status(404).json({
        message:"Internal Server Error",
       }); 
    }
};



const createTask = async (request,response) =>{
    const {title, assignedTo, description, startDate, endDate,} =request.body
    try {

        // to check if task already exist in our database under task collection
        const projectExist = await TaskModel.findOne({title, assignedTo});
        if (projectExist) {
            response.status(405).json({
                message: "Task already Assigned to this user"
            })
            };

   /// to create a new task
     const createNewTask = await TaskModel.create({
            title, assignedTo, description, startDate, endDate,
            });
  // we are saving every information that is in the req.body to the database
     const taskResult = await createNewTask.save();

// this is where i return the data that is successful
    // response.status(200).json(taskResult); 

    // or this way
    response.status(200).json({
        _id: taskResult._id,
        title: taskResult.title,
        assignedTo: taskResult.assignedTo,
        description: taskResult.description,
        startDate: taskResult.startDate,
        endDate: taskResult.endDate
    }); 
    } catch (error) {
       response.status(404).json({
        message:"failed to send data"
       }); 
    }
};
const updateTask =(request,response) =>{
    try {
    response.status(200).json({ message:"Let me update" }) 
    } catch (error) {
       response.status(404).json({
        message:"failed to fetch data"
       }); 
    }
};
const deleteTask =(request,response) =>{
    try {
    response.status(200).json({ message:"I want to delete" }) 
    } catch (error) {
       response.status(404).json({
        message:"failed to fetch data"
       }); 
    }
};
module.exports = {GetAllTask, createTask,updateTask,deleteTask,GetSingleTask,updateSingleTask,DeleteSingleTask, };