const express = require("express");
const morgan = require("morgan");
const app = express();

const colomnRouter = require("./routes/colomnRoute");
const taskRouter = require("./routes/taskRoute");
const subTaskRouter = require("./routes/subTaskRoute");

// create middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (*), or you can specify specific origins.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//To access the request body:
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/colomns", colomnRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/subTasks", subTaskRouter);

module.exports = app;
