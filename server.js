//Set up the server:

const mongoose = require("mongoose");
const dotEnv = require("dotenv");

dotEnv.config({
  path: "./config.env",
});

//Connect to the dataBase:
const DB = process.env.DATA_BASE.replace("<password>", process.env.PASSWORD);
mongoose.connect(DB).then(() => console.log("Connect to db"));

const app = require("./app");
const port = 3000;

app.listen(port, () => {
  console.log(`Server is waiting on port: ${port}`);
});
