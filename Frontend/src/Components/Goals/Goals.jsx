import AccountDetails from "../Account_Section/AccountDetails";
import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from "react";
import "./Goals.css";
import PageHeader from "../Modal/Page_Header/PageHeader";
import axios from "axios";
import { Modal } from "antd";
import EditGoal from "../Modal/Edit_Goal/EditGoal";
import GoalItem from "./Goal_Item/GoalItem";

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalGoalId, setModalGoalId] = useState(null);

  const [Goals, setGoals] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`http://localhost:3001/goals/get-goals/${user.data.Email}`)
      .then((goals) => {
        setGoals(goals.data);
      })
      .catch((err) => console.log(err));
  }, [Goals]);

  const showModal = (goalId) => {
    setIsModalOpen(true);
    setModalGoalId(goalId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <AccountDetails />
      <PageHeader section="Goals" status="true" />
      {Goals.map((goal) => (
        <GoalItem
          key={goal._id}
          goal={goal}
          showModal={showModal}
          handleCancel={handleCancel}
        />
      ))}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        {<EditGoal goalId={modalGoalId} setIsModalOpen={setIsModalOpen} />}
      </Modal>
    </div>
  );
};

export default Goals;
