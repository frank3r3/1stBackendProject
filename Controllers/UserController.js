const UserModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");

const RegisterUser = async (request,response) =>{
    const {firstName,lastName,email,phoneNumber,password} =request.body
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



const Login = async (request, response) => {
  const {email,password } = request.body;
  try {
    const CheckUser = await UserModel.findOne({email});
    if (!CheckUser) {
      return response.status(404).json({ message: "User not found" });
    }

    const validatePassword = await bcrypt.compare(password, CheckUser.password);
    // if (!validatePassword) {
    //   return response.status(401).json({ message: "Invalid password" });
    // }
    if (validatePassword){
        response.status(200).json({
            message: "Login successful"
        });

    } else{
       return response.status(401).json({ message: "Invalid password" });  
    }

    // Send user data (excluding password)
    return response.status(200).json({
      _id: CheckUser._id,
      email: CheckUser.email,
      // optionally: token or other data
    });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Server error" });
  }
};

module.exports = { RegisterUser, GetAllUser, Login };
