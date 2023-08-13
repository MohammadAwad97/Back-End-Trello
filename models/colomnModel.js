const mongoose = require("mongoose");

const colomnSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please enter the type of the list"],
    unique: true,
  },

  color: {
    type: String,
    required: [true, "Please enter the color"],
  },

  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task", // >> بتحط اسم الكوليكشن تبع الموديل كاملا
    },
  ],
});

const ColomnModel = mongoose.model("column", colomnSchema);
module.exports = ColomnModel;
