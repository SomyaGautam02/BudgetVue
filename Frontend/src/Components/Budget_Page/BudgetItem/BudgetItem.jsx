import { Progress } from 'antd'
import React from 'react'
import {
    FaMoneyBillWave,
  } from "react-icons/fa";

import "../BudgetPage.css"
const BudgetItem = ({key, brecord}) => {
  function addCommasToNumber(number) {
    const ans = String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }
  return (
    <div className="goals">
      <div className="goal_main container brecord">
        <div className="goal_submain">
          <div className="goal_name">
            <span className="goal_icon">{<FaMoneyBillWave/>}</span>
            <span className="goal_name">{brecord.category}</span>
          </div>
          <Progress
            className="per_bar"
            strokeColor="#C1ff72"
            percent={12}
            status="active"
          />
          <div className="goal_subsection">
            <div className="goal_amount">
            ₹{addCommasToNumber(brecord.budget_amount)}
            </div>
          </div>
        </div>
      </div>
    </div>  )
}

export default BudgetItem