const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  userid: String,
  budget_amount: {
    type: Number,
  },
  category: {
    type: String,
  },
  date: {
    type: String,
    default:"01-01-2023"
  },
});

const BudgetModel = mongoose.model("budget", BudgetSchema);
module.exports = BudgetModel;
