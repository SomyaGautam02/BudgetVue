import { Form, Input, Select, message } from "antd";
import axios from "axios";
import React from "react";
import "./EditBudget.css";

const EditBudget = () => {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUpdate = async (values) => {
    try {
      const { newBudgetAmount, newBudgetCategory } = values;
      await axios.put(
        `http://localhost:3001/budget/update-budget-amount/${user.data.Email}`,
        {
          newBudgetAmount,
          newBudgetCategory,
        }
      );
      message.success("Budget Updated.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="title_edit_budget">Edit Budget</div>
      <Form layout="vertical" form={form} onFinish={handleUpdate}>
        <Form.Item
          label="Budget Amount"
          name="newBudgetAmount"
          rules={[
            {
              required: true,
              message: "Please input Amount!",
            },
          ]}
        >
          <Input type="text" placeholder="Enter Budget Amount" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="newBudgetCategory"
          rules={[
            {
              required: true,
              message: "Please select a category!",
            },
          ]}
        >
          <Select placeholder="Please Select Category">
            <Select.Option value="Enterteriment">Enterteriment</Select.Option>
            <Select.Option value="Education">Education</Select.Option>
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Shopping">Shopping</Select.Option>
            <Select.Option value="Travel">Travel</Select.Option>
            <Select.Option value="Others">Miscellaneous</Select.Option>
          </Select>
        </Form.Item>

        <div className="d-flex justify-content-center buttons_both">
          <button className="btn btn-primary " type="submit">
            Update Budget
          </button>
        </div>
      </Form>
    </div>
  );
};

export default EditBudget;
