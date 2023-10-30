const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");
const GoalsRoutes=require("./routes/goals")
const BudgetRoutes=require("./routes/budget")

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true,
  })
);
app.use(cookieParser());

const databaseurl =
  "mongodb+srv://somyagautam02:jkluprojectminorSG@users.dl9gqww.mongodb.net/BudgetVue?retryWrites=true&w=majority";

mongoose.connect(databaseurl);
app.listen(3001, () => {
  console.log("Server is running");
});

//USER ROUTES
app.use("/", userRoutes);

// TRANSACTIN ROUTES
app.use("/transactions", transactionRoutes);

//GOALS ROUTES
app.use("/goals",GoalsRoutes)

//Budget ROUTES
app.use("/budget",BudgetRoutes)

