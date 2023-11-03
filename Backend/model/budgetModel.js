const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  userid: String,
  budget_amount: {
    type: Number,
  },
  initial_budget_amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date("2023-01-01"),
  },
});

const BudgetModel = mongoose.model("budget", BudgetSchema);
module.exports = BudgetModel;
