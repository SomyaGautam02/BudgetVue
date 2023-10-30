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
      const totalAmount = budgetRecords.reduce((total, record) => total + record.budget_amount, 0);
      res.status(200).json({ totalAmount, records: budgetRecords });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch budget balance" });
  }
};


const updateBudgetAmount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newBudgetAmount, newBudgetCategory} = req.body;
    const updateFields = {};

    // Check if a budget entry already exists for the user and category
    let existingBudget = await BudgetModel.findOne({ userid: userId, category: newBudgetCategory });

    if (!existingBudget) {
      // If it doesn't exist, create a new entry
      const newBudget = new BudgetModel({ userid: userId, category: newBudgetCategory, budget_amount: newBudgetAmount});
      const createdBudget = await newBudget.save();
      return res.status(201).json({ message: "Budget created successfully", createdBudget });
    }

    // Update the appropriate fields based on user input
    if (newBudgetAmount !== undefined) {
      existingBudget.budget_amount = newBudgetAmount;
      updateFields.budget_amount = newBudgetAmount;
    }

    await existingBudget.save();

    res.status(200).json({ message: "Budget updated successfully", updatedBudget: existingBudget, updatedFields: updateFields });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update or create budget" });
  }
};

const updateBudgetDate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { newDate } = req.body;

    // Find all budget entries for the specified user
    const existingBudgets = await BudgetModel.find({ userid: userId });

    if (existingBudgets.length === 0) {
      return res.status(404).json({ message: "No budget entries found for the user" });
    }

    // Update the date for all budget entries
    for (const existingBudget of existingBudgets) {
      existingBudget.date = newDate;
      await existingBudget.save();
    }

    res.status(200).json({ message: "Budget dates updated successfully", updatedBudgets: existingBudgets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update budget dates" });
  }
};




const getTotalExpensesAfterDate = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch the fromDate from the BudgetModel's date field for the specific user
    const budget = await BudgetModel.findOne({ userid: userId });
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    const fromDate = budget.date;

    // Use Moment.js to calculate the end date (30 days after the fromDate)
    const toDate = moment(fromDate).add(30, "days").toDate();
    const formattedDate = moment(toDate).format('YYYY-MM-DD');

    // Calculate the total expenses within the specified date range for the specific user, grouped by category
    const totalExpensesByCategory = await transactionModel.aggregate([
      {
        $match: {
          userid: userId,
          type: "Expense",
          date: { $gte: fromDate, $lte: formattedDate },
        },
      },
      {
        $group: {
          _id: "$category", // Group by category
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    // Calculate the sum of all category expenses
    const sumOfAllCategoryExpenses = totalExpensesByCategory.reduce((sum, categoryExpense) => sum + categoryExpense.totalExpense, 0);

    // Send the total expenses by category and the sum of all category expenses as a JSON response
    res.status(200).json({
      totalExpensesByCategory,
      sumOfAllCategoryExpenses,
    });
    console.log(totalExpensesByCategory);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to calculate total expenses" });
  }
};




module.exports = {
  getBudgetAmount,
  updateBudgetAmount,
  getTotalExpensesAfterDate,
  updateBudgetDate
};
