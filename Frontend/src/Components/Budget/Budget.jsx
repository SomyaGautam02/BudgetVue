import { Modal, Progress } from "antd";
import React, { useEffect, useState } from "react";
import "./Budget.css";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import EditBudget from "../Modal/Edit_Budget/EditBudget";
import { ToastContainer, toast } from 'react-toastify';
import EditBDate from "../Modal/Edit_Budget/EditBDate";

const Budget = ({TBudgetAmount}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Budget, setBudget] = useState([]);
  // const [BudgetDate, setBudgetDate] = useState();

  const showModal = (goalId) => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const [totalExpense, settotalExpense] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dashboard/get-expense-afterdate/${user.data.Email}`)
      .then((response) => {
        const data = response.data;
        const sumOfAllCategoryExpenses = data.sumOfAllCategoryExpenses;
        settotalExpense(sumOfAllCategoryExpenses);
      })
      .catch((error) => {
        console.error("Error fetching total expenses:", error);
      });
  }, []); // The empty dependency array means this effect runs once after the component mounts.



  function addCommasToNumber(number) {
    const ans = String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }

  // let budget_percentage=((totalExpense)/Budget.budget_amount)*100
  // let strokeColor = 'green'; 

  // if (budget_percentage <= 50) {
  //   strokeColor = '#00ff00'; 
  // } else if (budget_percentage > 50 && budget_percentage <= 75) {
  //   strokeColor = '#ffff00'; 
  // }
  // else if (budget_percentage > 75) {
  //   strokeColor = 'red'; 
  // }

  // const notify = () => toast("Wow so easy!");
  // let notificationTriggered = false;
  // if ((Budget.budget_amount- totalExpense)<=0 && !notificationTriggered){
  //   notify();
  //   notificationTriggered = true;
  // }
  
  return (
    <div className="budget_main">
      <span>Budget</span>
      <hr />
      <div className="budget_subsection">
        <div className="budget_title">Monthly</div>
        <div className="budget_amount">
          {" "}
          ₹{addCommasToNumber(TBudgetAmount)}
        </div>
      </div>
      <Progress
        className="per_bar budget_per_bar"
        // strokeColor={strokeColor}
        percent={parseFloat(12).toFixed(0)}
        status="active"
      />
      <div className="edit_icon budget_edit_icon">
        Budget Left: ₹12000
        <Link className="edit_btn budget_edit_btn" onClick={showModal}>
          <FaRegEdit />
        </Link>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        {/* {<EditBudget budgetid={Budget._id}/>} */}
        {<EditBDate/>}
      </Modal>
    </div>
  );
};

export default Budget;
