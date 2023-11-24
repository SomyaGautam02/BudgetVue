import React, { useEffect, useState } from "react";
import "./CashFlow.css";
import axios from "axios";

const CashFlow = () => {
  const [totalIncome, settotalIncome] = useState(0);
  const [totalExpense, settotalExpense] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/transactions//get-all-income/${user.data.Email}`
      )
      .then((response) => {
        const data = response.data;
        const totalIncome = data.totalIncome;
        const totalExpense = data.totalExpense;
        settotalIncome(totalIncome);
        settotalExpense(totalExpense);
      })
      .catch((error) => {
        console.error("Error fetching income total:", error);
      });
  });

  function addCommasToNumber(number) {
    const ans = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }

  return (
    <div className="cf_main ">
      <span> Cash Flow </span>
      <hr />
      <div className="cf_subsection">
        <div className="cf_items">
          <div className="cf_item">
            Total Income:{" "}
            <div className="cf_amount">₹{addCommasToNumber(totalIncome)}</div>
          </div>
          <div className="cf_item">
            Total Expense:{" "}
            <div className="cf_amount cf_expense">
              ₹{addCommasToNumber(totalExpense)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlow;
