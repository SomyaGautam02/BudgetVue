const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: [true, "amount is required"],
    },
    category: {
      type: String,
      require: [true, "category is required"],
    },
    type: {
      type: String,
      require: [true, "category is required"],
    },
    date: {
      type: String,
      require: [true, "date is required"],
    },
    desc: {
      type: String,
      default: "", 
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;
