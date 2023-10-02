import React from "react";
import { Form, Input, Select, message } from "antd";
import axios from "axios";
import "./Add_Goal.css";

const AddGoal = () => {
  const [form] = Form.useForm(); // Create a form instance

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:3001/goals/add-Goals", {
        ...values,
        userid: user.data.Email,
      });
      message.success("Goal added sucessfully");
      form.resetFields();
    } catch (error) {
      message.error("Failed to add Goal");
    }
  };

  return (
    <>
      <div className="title_add_record">New Goal</div>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Goal Name"
          name="goal_name"
          rules={[
            {
              required: true,
              message: "Please input Goal!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter Goal Name" />
        </Form.Item>

        <Form.Item
          label="Target Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input Amount!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter Amount" />
        </Form.Item>

        <Form.Item name="category">
          <Select placeholder="Select a category">
            <Select.Option value="car">New Vehicle</Select.Option>
            <Select.Option value="home">New Home</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="holiday_trip">Holiday Trip</Select.Option>
            <Select.Option value="health_care">Health Care</Select.Option>
            <Select.Option value="emergency_funds">
              Emergency Funds
            </Select.Option>
            <Select.Option value="party">Party</Select.Option>
            <Select.Option value="kids">Kids</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Desired Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select date!",
            },
          ]}
        >
          <Input type="Date" placeholder="Enter Desired Date" />
        </Form.Item>

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">
            {" "}
            Add Goal
          </button>
        </div>
      </Form>{" "}
    </>
  );
};

export default AddGoal;
