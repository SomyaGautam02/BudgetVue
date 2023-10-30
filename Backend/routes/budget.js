const express = require("express");
const { getBudgetAmount, updateBudgetAmount, getTotalExpensesAfterDate, updateBudgetDate } = require("../controllers/budgetCtrl");

const router = express.Router();

router.get('/get-budget-amount/:userId',getBudgetAmount)

router.put('/update-budget-amount/:userId',updateBudgetAmount)

router.get('/get-expense-afterdate/:userId',getTotalExpensesAfterDate)

router.put('/update-budget-date/:userId',updateBudgetDate)

module.exports = router;
