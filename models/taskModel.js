const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the task title"],
  },

  description: {
    type: String,
  },

  status: {
    type: String,
    required: [true, "Please enter the status"],
    touppercase: true,
  },
  columnId: {
    type: mongoose.Schema.Types.ObjectId, // Change to ObjectId type
    ref: "column", // Correct reference to the collection name
  },

  subTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subTask" // >>  The name of collection 
    },
  ],
});

const TaskModel = mongoose.model("task", taskSchema);
module.exports = TaskModel;
