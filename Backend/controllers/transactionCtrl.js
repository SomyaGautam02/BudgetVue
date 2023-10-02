const transactionModel = require("../model/recordModel");

const getAllTransaction = async (req, res) => {
  const userId = req.params.userId;
  try {
    const transactions = await transactionModel.find({userid:userId});
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getLastTransaction = async (req, res) => {
  const userId = req.params.userId;
  try {
    const transaction = await transactionModel
      .findOne({ userid: userId }) // Replace 'userid' with 'userId' to match your schema field name
      .sort({ createdAt: -1 }) // Sort by time in descending order (latest first)
      .limit(1); // Limit the result to one record
    res.status(200).json(transaction);
    // console.log(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};




module.exports = { getAllTransaction, addTransaction, getLastTransaction };
