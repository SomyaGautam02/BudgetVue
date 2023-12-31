const BudgetModel = require("../model/budgetModel");
const moment = require("moment");
const transactionModel = require("../model/recordModel");

const getBudgetAmount = async (req, res) => {
  const userId = req.params.userId;

  try {
    let budgetRecords = await BudgetModel.find({ userid: userId });
    if (budgetRecords.length === 0) {
      res.status(200).json({ totalAmount: 0, records: [] });
    } else {
      const totalAmount = budgetRecords.reduce(
        (total, record) => total + record.initial_budget_amount,
        0
      );
      const lefttotalAmount = budgetRecords.reduce(
        (ltotal, record) => ltotal + record.budget_amount,
        0
      );
      res
        .status(200)
        .json({ totalAmount, lefttotalAmount, records: budgetRecords });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch budget balance" });
  }
};

const updateBudgetAmount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newBudgetAmount, newBudgetCategory } = req.body;
    const updateFields = {};
    let existingBudget = await BudgetModel.findOne({
      userid: userId,
      category: newBudgetCategory,
    });

    if (!existingBudget) {
      const newBudget = new BudgetModel({
        userid: userId,
        category: newBudgetCategory,
        budget_amount: newBudgetAmount,
        initial_budget_amount: newBudgetAmount,
      });
      const createdBudget = await newBudget.save();
      return res
        .status(201)
        .json({ message: "Budget created successfully", createdBudget });
    }
    if (newBudgetAmount !== undefined) {
      existingBudget.budget_amount = newBudgetAmount;
      existingBudget.initial_budget_amount = newBudgetAmount;
      updateFields.budget_amount = newBudgetAmount;
    }

    await existingBudget.save();

    res
      .status(200)
      .json({
        message: "Budget updated successfully",
        updatedBudget: existingBudget,
        updatedFields: updateFields,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update or create budget" });
  }
};

const updateBudgetDate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newDate } = req.body;
    const existingBudgets = await BudgetModel.find({ userid: userId });
    if (existingBudgets.length === 0) {
      return res
        .status(404)
        .json({ message: "No budget entries found for the user" });
    }
    for (const existingBudget of existingBudgets) {
      existingBudget.date = newDate;
      await existingBudget.save();
    }

    res
      .status(200)
      .json({
        message: "Budget dates updated successfully",
        updatedBudgets: existingBudgets,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update budget dates" });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const bid = req.params.bid;
    const deleteB = await BudgetModel.findByIdAndRemove(bid);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Budget" });
  }
};

const getTotalExpensesAfterDate = async (req, res) => {
  try {
    const { userId } = req.params;
    const budget = await BudgetModel.findOne({ userid: userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    const fromDate = budget.date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const toDate = new Date(moment(fromDate).add(30, "days"));
    const formattedToDate = toDate.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const totalExpensesByCategory = await transactionModel.aggregate([
      {
        $match: {
          userid: userId,
          type: "Expense",
          date: { $gte: fromDate, $lte: formattedToDate },
        },
      },
      {
        $group: {
          _id: "$category",
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    const budgetAmountByCategory = {};
    totalExpensesByCategory.forEach((categoryExpense) => {
      const category = categoryExpense._id;
      const totalExpense = categoryExpense.totalExpense;

      const budgetAmount = budget.budget_amount[category] || 0;

      const remainingBudget = budgetAmount - totalExpense;
      budgetAmountByCategory[category] = remainingBudget;
    });

    res.status(200).json(budgetAmountByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to calculate remaining budget" });
  }
};

module.exports = {
  getBudgetAmount,
  updateBudgetAmount,
  getTotalExpensesAfterDate,
  updateBudgetDate,
  deleteBudget,
};
