import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import AccountDetails from "../Account_Section/AccountDetails";
import PageHeader from "../Modal/Page_Header/PageHeader";
import "./BudgetPage.css";
import { Link } from "react-router-dom";
import { Alert, Modal, Space } from "antd";
import Budget from "../Budget/Budget";
import EditBudget from "../Modal/Edit_Budget/EditBudget";
import axios from "axios";
import BudgetItem from "./BudgetItem/BudgetItem";
const BudgetPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [BudgetRecord, setBudget] = useState([]);
  const [TBudgetAmount, setBudgetAmount] = useState();
  const [LBudgetAmount, setLBudgetAmount] = useState();

  const user = JSON.parse(localStorage.getItem("user"));

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/budget/get-budget-amount/${user.data.Email}`)
      .then((response) => {
        const { totalAmount, lefttotalAmount, records } = response.data;
        setBudgetAmount(totalAmount);
        setLBudgetAmount(lefttotalAmount);
        setBudget(records);
      })
      .catch((error) => {
        console.error("", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <AccountDetails />
      
      <PageHeader section="Budget" status="false" />
      <div className="budgetpage">
        <div className="budgetlist">
          {BudgetRecord.map((brecord) => (
            <BudgetItem key={brecord._id} brecord={brecord} />
          ))}
        </div>
        <div className="vertical_line_bpage"></div>

        <div className="totalbudget">
          <div className="add_section">
            <Link onClick={showModal} className={"add_button"}>
              + Add Categorywise Budget
            </Link>{" "}
          </div>
          <Budget TBudgetAmount={TBudgetAmount} LBudgetAmount={LBudgetAmount} />
        </div>
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <EditBudget />
      </Modal>
    </div>
  );
};

export default BudgetPage;
