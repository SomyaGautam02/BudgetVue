import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import AccountDetails from "../Account_Section/AccountDetails";
import "./Dashboard.css";
import CashFlow from "../Cash_Flow/CashFlow";
import RecentExpense from "../Recent_Expense/RecentExpense";
import Budget from "../Budget/Budget";
import Insights from "../Insights/Insights";
import GoalCard from "../Modal/Goals_Card/GoalCard";

const Dashboard = () => {
  const [balanceTrend, setbalanceTrend] = useState();
  return (
    <div className="dashboard">
      <Navbar />
      <AccountDetails setbalanceTrend={setbalanceTrend} />
      <div className="dashboard_upper_section row">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <CashFlow />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <RecentExpense />
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          {/* <Budget /> */}
          <GoalCard/>
        </div>

      </div>
      <hr />
      <Insights balanceTrend={balanceTrend} />
    </div>
  );
};

export default Dashboard;
