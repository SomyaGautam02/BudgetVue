import { Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import "./EditGoal.css";

const EditGoal = (props) => {
  const [form] = Form.useForm();
  const [newAmount, setNewAmount] = useState();
  const [newDate, setNewDate] = useState();
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3001/goals/update-saved-amount/${props.goalId}`,
        {
          newSavedAmount: newAmount,
          newSavedDate: newDate,
        }
      );
      message.success("Updated Goal");
    } catch (error) {}
  };

  const handleDeleteGoal = async () => {
    var dgoal = window.confirm("Do you really want to Delete This Goal?");
    if (dgoal) {
      try {
        await axios.delete(
          `http://localhost:3001/goals/delete-goal/${props.goalId}`
        );
        message.success("Goal deleted successfully");
        props.setIsModalOpen(false);
      } catch (error) {
        message.error("Failed to delete Goal");
      }
    } else {
      message.info("Goal is not Deleted.");
    }
  };

  return (
    <>
      <div className="title_add_record">Edit Goal</div>
      <Form layout="vertical" form={form} onFinish={handleUpdate}>
        <Form.Item label="Saved Amount" name="goal_name">
          <Input
            type="text"
            placeholder="Enter Saved Amount"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Desired Date" name="date">
          <Input
            type="Date"
            placeholder="Edit Desired Date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </Form.Item>

        <div className="d-flex justify-content-center buttons_both">
          <button className="btn btn-primary " type="submit">
            {" "}
            Update Goal
          </button>
          <button
            className="btn btn-primary form_button"
            type="submit"
            onClick={handleDeleteGoal}
          >
            {" "}
            Delete Goal
          </button>
        </div>
      </Form>{" "}
    </>
  );
};

export default EditGoal;
