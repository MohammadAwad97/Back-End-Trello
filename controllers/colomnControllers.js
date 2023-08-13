const ColomnModel = require("../models/colomnModel");
const TaskModel = require("../models/taskModel");

//Create Colomn:

exports.createColomn = async (req, res) => {
  console.log(req.body);
  try {
    const newColomn = await ColomnModel.create(req.body);

    const task = await res.status(200).json({
      status: "success",
      data: {
        colomn: newColomn,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//get all colomns:

exports.getAllColomns = async (req, res) => {
  try {
    const colomns = await ColomnModel.find().populate("items");
    res.status(201).json({
      status: "success",
      result: colomns.length,
      data: {
        colomns,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//delete colomns
exports.deleteColomn = async (req, res) => {
  try {
    await ColomnModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//get one column:

exports.getColumn = async (req, res) => {
  try {
    const column = await ColomnModel.findById(req.params.id).populate("items");
    // const tasks = await TaskModel.find({ columnId: req.params.id }); // To find tasks related with this col.

    // console.log(tasks);
    res.status(200).json({
      status: "success",
      data: {
        column,
        // tasks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};


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
