const express = require("express");
const {
  addTransaction,
  getAllTransaction,
  getLastTransaction,
  getAllIncome,
  getLastThreeTransactions,
  getAllExpenses,
  deleteTransactionRecords,
} = require("../controllers/transactionCtrl");

const router = express.Router();

router.post("/add-transactions", addTransaction);

router.get("/get-transactions/:userId", getAllTransaction);

router.get("/get-all-expense/:userId", getAllExpenses);

router.get("/get-all-income/:userId", getAllIncome);

router.get("/get-three-transactions/:userId", getLastThreeTransactions);

router.delete("/delete-transactions/:userId", deleteTransactionRecords);

module.exports = router;
