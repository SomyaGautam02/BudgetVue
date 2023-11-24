import React, { useEffect, useState } from "react";
import "./Insights.css";
import BalanceChart from "./Graphs/Balance_Chart/CashFlowTrendChart";
import axios from "axios";
import ExpensePie from "./Graphs/Expense_Pie_chart/ExpensePie";
import BalanceTrend from "./Graphs/Balance_Trend/BalanceTrend";
import SidebarChart from "./Graphs/SideBarChart/SidebarChart ";
import VerticalBarChart from "./Graphs/SideBarChart/SidebarChart ";
import RecordsChart from "./Graphs/Balance_Chart/RecordsChart";
import CashFlowTrend from "./Graphs/Balance_Chart/CashFlowTrendChart";
const Insights = ({ balanceTrend }) => {
  const [Records, setRecords] = useState([]);
  const [Expenses, setExpenses] = useState([]);
  const [CashFlow, setCashFlowData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/transactions/get-transactions/${user.data.Email}`
      )
      .then((response) => {
        const records = response.data;
        const cashFlowDataMap = {};
        records.forEach((record) => {
          const date = record.date;
          if (!cashFlowDataMap[date]) {
            cashFlowDataMap[date] = { date, income: 0, expenses: 0 };
          }
          if (record.type === "Income") {
            cashFlowDataMap[date].income += record.amount;
          } else if (record.type === "Expense") {
            cashFlowDataMap[date].expenses += record.amount;
          }
        });
        const cashFlowData = Object.values(cashFlowDataMap);
        cashFlowData.sort((a, b) => new Date(a.date) - new Date(b.date));
        setCashFlowData(cashFlowData);
      })
      .catch((err) => console.log(err));
  }, [user.data.Email]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/transactions/get-all-expense/${user.data.Email}`
      )
      .then((records) => {
        setExpenses(records.data.reverse());
      })
      .catch((err) => console.log(err));
  }, [Expenses]);

  return (
    <div className="insights">
      <div className="insights_main row">
        <h2>Insights</h2>
        <div className="charts_heading col-lg-12 col-md-12 col-sm-12">
          {" "}
          Income/Expense Charts
        </div>
        <div className="line_chart col-lg-12 col-md-6 col-sm-12">
          <RecordsChart data={CashFlow} />
        </div>
        <div className="charts_heading col-lg-12 col-md-12 col-sm-12">
          {" "}
          CashFlow Chart
        </div>
        <div className="cashflow_graph col-lg-12 col-md-6 col-sm-12">
          <CashFlowTrend data={CashFlow} />
        </div>
        <div className="charts_heading col-lg-12 col-md-12 col-sm-12">
          {" "}
          Expenses Breakdown Charts
        </div>
        <div className="expense_charts col-lg-6 col-md-6 col-sm-12">
          <ExpensePie expenses={Expenses} />
        </div>
        <div className="expense_vertical_chart col-lg-6 col-md-6 col-sm-12">
          <VerticalBarChart expenses={Expenses} className="ebar-chart" />
        </div>
      </div>
    </div>
  );
};

export default Insights;
