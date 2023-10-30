import React, { useEffect, useState } from "react";
import "./AccountDetails.css";
import axios from "axios";
import BalanceTrend from "../Insights/Graphs/Balance_Trend/BalanceTrend";

const AccountDetails = ({ setbalanceTrend }) => {
  const [netIncome, setnetIncome] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user.data && user.data.Email) {
      axios
        .get(`http://localhost:3001/transactions/get-all-income/${user.data.Email}`)
        .then((response) => {
          const data = response.data;
          const totalIncome = data.netBalance;
          setnetIncome(totalIncome);
          setbalanceTrend(totalIncome);
        })
        .catch((error) => {
          console.error('Error fetching income total:', error);
        });
    }
  }, [user.data.Email]);

  return (
    <div className="Account">
      <div className="Show_Account">
        <div className="Account_Title">Account</div>
        <div className="Account_Money">₹{netIncome}</div>
      </div>
      <div className="Show_Account2">
      <BalanceTrend balanceTrend={netIncome} />

      </div>


    </div>
  );
};

export default AccountDetails;
