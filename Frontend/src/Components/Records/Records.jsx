import AccountDetails from "../Account_Section/AccountDetails";
import Navbar from "../Navbar/Navbar";
import PageHeader from "../Modal/Page_Header/PageHeader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import RecordItem from "./Record_Item/RecordItem";
import "./Records.css";
import { Select } from "antd";
import { BsFillFunnelFill } from "react-icons/bs";

const Records = () => {
  const [Records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalGoalId, setModalGoalId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/transactions/get-transactions/${user.data.Email}`
      )
      .then((records) => {
        setRecords(records.data.reverse());
      })
      .catch((err) => console.log(err));
  }, [Records]);

  const showModal = (goalId) => {
    setIsModalOpen(true);
    setModalGoalId(goalId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [filteredRecords, setFilteredRecords] = useState([]);

  const handleFilterByType = (type) => {
    let filtered;

    if (type === "All") {
      filtered = [];
    } else {
      filtered = Records.filter((record) => record.type === type);
    }

    setFilteredRecords(filtered);
  };

  return (
    <div>
      <Navbar />
      <AccountDetails />
      <PageHeader section="Records" status="false" />
      <div className="filter_btn container">
        <Select
          placeholder="Filter"
          onChange={handleFilterByType}
          suffixIcon={<BsFillFunnelFill />}
          className="filter_select"
        >
          <Select.Option value="All">All</Select.Option>
          <Select.Option value="Income">Income</Select.Option>
          <Select.Option value="Expense">Expense</Select.Option>
        </Select>
      </div>

      {filteredRecords.length > 0
        ? filteredRecords.map((record) => (
            <RecordItem
              key={record._id}
              record={record}
              showModal={showModal}
              handleCancel={handleCancel}
            />
          ))
        : Records.map((record) => (
            <RecordItem
              key={record._id}
              record={record}
              showModal={showModal}
              handleCancel={handleCancel}
            />
          ))}
    </div>
  );
};

export default Records;
