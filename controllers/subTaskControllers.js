const SubTaskModel = require("../models/subTaskModel");

//Create SubTasks
exports.creatSubTask = async (req, res) => {
  taskId = req.params.taskId;
  try {
    const newSubTask = await SubTaskModel.create({ ...req.body, taskId });
    res.status(200).json({
      status: "success",
      data: {
        subTask: newSubTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//Get all subTasks:
exports.getAllSubTasks = (req, res) => {
  try {
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
