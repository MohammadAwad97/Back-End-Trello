const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add a sub task"],
  },

  checked: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task",
  },
});

const SubTaskModel = mongoose.model("subTask", subTaskSchema);
module.exports = SubTaskModel;
