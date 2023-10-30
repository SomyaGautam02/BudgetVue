import React, { useEffect, useState } from "react";
import "./GoalCard.css"
import axios from "axios";
const GoalCard = () => {
  const [totalGoals,setTotalGoals]=useState()
  const [totalSavedAmount,settotalSavedAmount]=useState()
  const [totalLeftAmount,settotalLeftAmount]=useState("")
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    axios
      .get(`http://localhost:3001/goals/get-goals-dashboard/${user.data.Email}`)
      .then((response) => {
        const summary =response.data;
        setTotalGoals(summary.numberOfGoals)
        settotalSavedAmount(summary.totalAmountSaved)
        settotalLeftAmount(summary.totalAmountLeft)
      })
      .catch((err) => console.log(err));
  })

  function addCommasToNumber(number) {
    const ans = String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }
  
  return (
    <div className="goals_main">
      <span>Goals Summary</span>
      <hr />
      <div className="goals_items">

      <div className="goals_subsection">
        <div className="goals_card_heading">Number of Goals:</div>
        <div className="goals_card_heading">Total Saved Amount:</div>
        <div className="goals_card_heading">Amount to be Saved:</div>
      </div>
      <div className="goals_subsection_number">
        <div className="goals_card_heading">{addCommasToNumber(totalGoals)}</div>
        <div className="goals_card_heading">₹{addCommasToNumber(totalSavedAmount)}</div>
        <div className="goals_card_heading">₹{addCommasToNumber(totalLeftAmount)}</div>
      </div>
      </div>

    </div>
  );
};

export default GoalCard;
