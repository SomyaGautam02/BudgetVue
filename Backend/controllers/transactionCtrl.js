const transactionModel = require("../model/recordModel");
const BudgetModel = require("../model/budgetModel");

async function updateBudgetAmount(category, date, expenseAmount) {
  try {
      const budget = await BudgetModel.findOne({ category:category});
      const toDate = new Date(budget.date);
      toDate.setDate(toDate.getDate() + 30)
      if (budget && new Date(date) >= new Date(budget.date) && new Date(date) <=toDate ) {
          budget.budget_amount -= expenseAmount;
          await budget.save();
      }
  } catch (error) {
      console.error("Error updating budget:", error);
  }
}



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

const getAllExpenses = async (req, res) => {
  const userId = req.params.userId;
  try {
    const expenses = await transactionModel.find({ userid: userId, type: 'Expense' });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


// const addTransaction = async (req, res) => {
//   try {
//     const newTransaction = new transactionModel(req.body);
//     await newTransaction.save();
//     res.status(201).send("Transaction Created");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const addTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    const newTransaction = new transactionModel(transactionData);
    await newTransaction.save();
    await updateBudgetAmount(transactionData.category, new Date(transactionData.date), transactionData.amount);
    res.status(201).send("Transaction Created");
  } catch (error) {
    res.status(500).json(error);
  }
};


const getAllIncome = async (req, res) => {
  const userId = req.params.userId;
  try {
    const incomeTotal = await transactionModel.aggregate([
      {
        $match: {
          userid: userId, // Add any additional conditions if needed
          type: "Income",
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const expenseTotal = await transactionModel.aggregate([
      {
        $match: {
          userid: userId,
          type: "Expense",
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    // Extract the totalIncome and totalExpense values from the aggregation results
    const totalIncome = incomeTotal.length > 0 ? incomeTotal[0].totalIncome : 0;
    const totalExpense = expenseTotal.length > 0 ? expenseTotal[0].totalExpense : 0;

    const netBalance = totalIncome - totalExpense;
    res.status(200).json({netBalance,totalExpense,totalIncome});
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};


const getLastThreeTransactions = async (req, res) => {
  const userId = req.params.userId;

  try {
    const transactions = await transactionModel
      .find({ userid: userId }) // Replace 'userId' with your schema field name
      .sort({ createdAt: -1 }) // Replace 'dateField' with your date field name (e.g., 'createdAt')
      .limit(3); // Limit the result to 3 records

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};





module.exports = { getAllTransaction, addTransaction, getAllIncome, getLastThreeTransactions,getAllExpenses };
