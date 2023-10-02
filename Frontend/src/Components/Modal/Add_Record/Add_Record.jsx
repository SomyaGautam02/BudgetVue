import { DatePicker, Form, Input, Radio, Select, message } from "antd";
import axios from "axios";
import "./Add_Record.css";
import { useState } from "react";

const AddRecord = (props) => {
  const [form] = Form.useForm(); // Create a form instance
  const [placement, SetPlacement] = useState('topLeft');
  const placementChange = (e) => {
    SetPlacement(e.target.value);
  };
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post("http://localhost:3001/transactions/add-transactions", {
        ...values,
        userid: user.data.Email,
      });
      message.success("Record added sucessfully");
      form.resetFields();
    } catch (error) {
      message.error("Failed to add Record");
    }
  };

  return (
    <>
    <div className="title_add_record">Add Record</div>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please select a type!",
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="Expense" className="expense">Expense</Radio.Button>
            <Radio.Button value="Income" className="income">Income</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input amount!",
            },
          ]}
        >
          <Input type="text" placeholder="Please Enter Amount" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select a category!",
            },
          ]}
        >
          <Select placeholder="Please Select Category">
            <Select.Option value="Bills">Bills</Select.Option>
            <Select.Option value="Enterteriment">Enterteriment</Select.Option>
            <Select.Option value="Education">Education</Select.Option>
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Investments">Investments</Select.Option>
            <Select.Option value="Other Income">Other Income</Select.Option>
            <Select.Option value="Rent">Rent</Select.Option>
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Shopping">Shopping</Select.Option>
            <Select.Option value="Transportation">Transportation</Select.Option>
            <Select.Option value="Others">Others</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
        >
          <Input type="text" placeholder="Please Enter Description"/>
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select date!",
            },
          ]}
        >
          <Input type="Date" />
        </Form.Item>
        {/* <Form.Item
        label="Date"
        name="date"
        rules={[
          {
            required: true,
            message: "Please select date!",
          },
        ]}>
        <DatePicker placement={placement} />
        </Form.Item> */}

        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">
            {" "}
            Add Record
          </button>
        </div>
      </Form>{" "}
    </>
  );
};

export default AddRecord;
