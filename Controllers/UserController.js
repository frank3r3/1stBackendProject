const UserModel = require("../Models/UserModel");

const RegisterUser = async (request,response) =>{
    const { firstName,lastName,email,phoneNumber,password,  } =request.body
    try {

        // to check if task already exist in our database under task collection
        const UserExist = await UserModel.findOne({email,});
        if (UserExist) {
            response.status(405).json({
                message: "Email already Assigned to a User"
            })
            };

   /// to create a new task
     const createNewUser = await UserModel.create({
           firstName,lastName,email,phoneNumber,password, 
            });
  // we are saving every information that is in the req.body to the database
     const UserResult = await createNewUser.save();

// this is where i return the data that is successful
    // response.status(200).json(taskResult); 

    // or this way
    response.status(200).json({
        _id: UserResult._id,
        firstName: UserResult.firstName,
        lastName: UserResult.lastName,
        email: UserResult.email,
        phoneNumber: UserResult.phoneNumber,
        password: UserResult.password
        
    }); 
    } catch (error) {
       response.status(404).json({
        message:"failed to send data"
       }); 
    }
};

const GetAllUser = async(request,response) =>{
    try {
        const result = await UserModel.find().sort({createdAt:-1});
    response.status(200).json(result); 
    } catch (error) {
       response.status(404).json({
        message:"failed to fetch data",
       }); 
    }
};
module.exports = {RegisterUser,GetAllUser}