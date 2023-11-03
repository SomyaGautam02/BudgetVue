import { Alert, Progress, message } from 'antd'
import React from 'react'
import {
    FaMoneyBillWave,
  } from "react-icons/fa";
import {MdDelete} from "react-icons/md"

import "../BudgetPage.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
const BudgetItem = ({key, brecord}) => {
  function addCommasToNumber(number) {
    const ans = String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }
  const record_percentage=((brecord.initial_budget_amount-brecord.budget_amount)/brecord.initial_budget_amount)*100
  let strokeColor = 'green'; 

  if (record_percentage <= 50) {
    strokeColor = '#00ff00'; 
  } else if (record_percentage > 50 && record_percentage <= 75) {
    strokeColor = '#ffff00'; 
  }
  else if (record_percentage > 75) {
    strokeColor = 'red'; 
  }
  const handledeletebudget = async () => {
    var deleteb=window.confirm("Do you really want to delete This Budget Category.");
    if(deleteb){
      try {
        await axios.delete(
          `http://localhost:3001/budget/delete-category-budget/${brecord._id}`
        );
        message.success("Budget Category deleted successfully");
      } catch (error) {
        message.error("Failed to delete Budget Category");
      }
    }
    else{
      message.info("Budget Category not Deleted");


    }

  };
 
 
 
  return (
    <div className="goals">
      {record_percentage > 90 && (
    <Alert
      message="Budget Limit Waring!!"
      description = {`${brecord.category} category budget is running low please spend wisely.`}
      type="warning"
      showIcon
      closable
    />
  )}
      <div className="goal_main container brecord">
        <div className="goal_submain">
          <div className="goal_name">
            <span className="goal_icon b_icon">{<FaMoneyBillWave/>}</span>
            <span className="goal_name brecord_name">{brecord.category}</span>
          </div>
          <Progress
            className="per_bar brecord_bar"
            strokeColor={strokeColor}
            percent={record_percentage.toFixed(0)}
            status="active"
          />
          <div className="goal_subsection">
            <div className="goal_amount brecord_amount">
            ₹{addCommasToNumber(brecord.budget_amount)}
            </div>
          </div>
          <div className="edit_icon">
              <Link className="edit_btn_btn_item" onClick={handledeletebudget}>
                <MdDelete />
              </Link>
            </div>
        </div>
      </div>
    </div>  )
}

export default BudgetItem