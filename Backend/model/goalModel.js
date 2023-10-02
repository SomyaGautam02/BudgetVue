const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true,
  },
  goal_name: {
    type: String,
  },
  amount: {
    type: Number,
  },
  saved_amount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: "other",
  },
  date: {
    type: String,
  },
});

const GoalModel = mongoose.model("Goals", GoalSchema);
module.exports = GoalModel;
