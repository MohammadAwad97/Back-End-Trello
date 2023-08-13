const TaskModel = require("../models/taskModel");
const ColomnModel = require("../models/colomnModel");

//Create task:

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    //Find column based on the status:
    const column = await ColomnModel.findOne({ type: status });
    console.log(column);

    if (!column) {
      return res.status(400).json({
        status: "fail",
        message: "No column found for the given status ",
      });
    }

    const newTask = await TaskModel.create({
      title,
      description,
      status,
      columnId: column._id,
    });

    //push the item to the array in the col.
    column.items.push(newTask._id);
    await column.save();

    res.status(200).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//get all taks:
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(201).json({
      status: "success",
      result: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// delete task:

// exports.deleteTask = async (req, res) => {
//   try {

//     const response = await TaskModel.findByIdAndDelete(req.params.id);
//     res.status(201).json({
//       status: "success",
//       data: null,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

// Delete task in each column :
exports.deleteTask = async (req, res) => {
  try {
    const { colid, taskid } = req.params;

    await TaskModel.findByIdAndDelete(taskid);
    //find the col.
    const column = await ColomnModel.findById(colid);

    if (!column) {
      return res.status(404).json({
        status: "fail",
        message: "Column is not found",
      });
    }

    column.items = column.items.filter(
      (task) => task._id.toString() !== taskid
    );

    await column.save();

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
