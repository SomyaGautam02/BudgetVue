const express = require("express");
const {
  addGoals,
  getAllGoals,
  deleteGoal,
  updateGoal,
  getgoalsdetails,
} = require("../controllers/goalCtrl");

const router = express.Router();

router.post("/add-goals", addGoals);

router.get("/get-goals/:userId", getAllGoals);

router.get("/get-goals-dashboard/:userId", getgoalsdetails);

router.delete("/delete-goal/:goalId", deleteGoal);

router.put("/update-saved-amount/:goalId", updateGoal);

module.exports = router;
