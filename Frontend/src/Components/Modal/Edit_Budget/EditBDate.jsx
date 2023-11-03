import { Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import "./EditBudget.css";

const EditBDate = () => {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUpdate = async (values) => {
    try {
      const { newDate } = values;
      console.log(newDate)
      await axios.put(
        `http://localhost:3001/budget/update-budget-date/${user.data.Email}`,
        {
          newDate
        }
      );
      message.success("Budget Updated.");
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  return (
    <div>
      <div className="title_edit_budget">Edit Budget Date</div>
      <Form layout="vertical" form={form} onFinish={handleUpdate}>
      <Form.Item
          label="Date"
          name="newDate"
          rules={[
            {
              required: true,
              message: "Please select date!",
            },
          ]}
        >
          <Input type="Date" />
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

export default EditBDate;
