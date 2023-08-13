const express = require("express");
const router = express.Router();

const {
  createColomn,
  getAllColomns,
  deleteColomn,
  getColumn,
  deleteTask
} = require("../controllers/colomnControllers");

//get and create colomns:
router.route("/").get(getAllColomns).post(createColomn);

//delete colomn
router.route("/:id").get(getColumn).delete(deleteColomn)

//delete and patch colomn
router.route('/:colid/tasks/:taskid').delete(deleteTask)
module.exports = router;
