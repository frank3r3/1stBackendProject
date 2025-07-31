const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema(
   {
    //  Sample: {
    //     type: String, 
    //     required:[true,"please this field is required"]
    //     unique: true,
    //     default:"anything"
    // }

    title: {
        type: String,
        require: true
    },

   assignedTo: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
        minlength: [5,"minimum length should be more than 20 letter words"],
        maxlength: [500, "maximum length should not be more than 500 words"]
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    projectLink: {
        type: String,
        require: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
       enum: ["Pending","In progress", "Completed"],
       default: "Pending"
    }
   },


    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", TaskSchema)