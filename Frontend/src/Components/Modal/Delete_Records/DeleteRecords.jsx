import { Form, Input, message } from "antd";
import axios from "axios";
import React from "react";

const DeleteRecords = (props) => {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleUpdate = async (values) => {
    try {
      const { newDate } = values;
      await axios.delete(
        `http://localhost:3001/transactions/delete-transactions/${user.data.Email}?newDate=${newDate}`
      );
      message.success("Records Updated.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="title_edit_budget">Delete Records Till Date</div>
      <Form layout="vertical" form={form} onFinish={handleUpdate}>
        <Form.Item
          label="Select Date"
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
            Delete Records
          </button>
        </div>
      </Form>
    </div>
  );
};

export default DeleteRecords;
