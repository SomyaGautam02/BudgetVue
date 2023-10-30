const GoalModel = require("../model/goalModel");

const getAllGoals = async (req, res) => {
  const userId = req.params.userId;
  try {
    const goals = await GoalModel.find({ userid: userId });
    res.status(200).json(goals);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addGoals = async (req, res) => {
  try {
    const newGoal = new GoalModel(req.body);
    await newGoal.save();
    res.status(201).send("Goal Created");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.goalId;
    const deletedGoal = await GoalModel.findByIdAndRemove(goalId);
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Goal" });
  }
};

const updateGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const { newSavedAmount, newSavedDate } = req.body;
    const updatedGoal = await GoalModel.findByIdAndUpdate(
      goalId,
      {
        $inc: { saved_amount: newSavedAmount },
        $set: { date: newSavedDate },
      },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res
      .status(200)
      .json({ message: "Saved amount updated successfully", updatedGoal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update saved amount" });
  }
};

const getgoalsdetails = async(req, res)=>{
  const userId = req.params.userId;
  try {
    const goals = await GoalModel.find({ userid: userId });
    const numberOfGoals = goals.length;
    let totalAmountSaved = 0;
    let totalAmountLeft = 0;
    for (const goal of goals) {
      totalAmountSaved += goal.saved_amount;
      totalAmountLeft += (goal.amount - goal.saved_amount);
    }
    const summary = {
      numberOfGoals,
      totalAmountSaved,
      totalAmountLeft,
    };
    res.status(200).json(summary);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }

}

module.exports = { addGoals, getAllGoals, deleteGoal, updateGoal, getgoalsdetails };
