const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllSubTasks,
  creatSubTask,
} = require("./../controllers/subTaskControllers");

router.route("/").get(getAllSubTasks).post(creatSubTask);

module.exports = router;
