const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  deleteTask,
} = require("../controllers/taskControllers");

const subTaskRouter = require("./../routes/subTaskRoute");

//Create new task and get all:
router.route("/").get(getAllTasks).post(createTask);

//Nested Route:  
router.use("/:taskId/subTasks", subTaskRouter);


//delete and patch one task:
// router.route('/:id').delete(deleteTask)
// router.route('/:colid/tasks/:taskid').delete(deleteTask)

module.exports = router;
