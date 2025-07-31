const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
   {
    
/// title is an example of a data field structure
    password: {
        type: String,
        require: true
    },
  confirmPassword: {
        type: String,
        require: true
    },
   },


    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema)