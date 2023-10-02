import React from "react";
import { FaCoins } from "react-icons/fa";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { format } from "date-fns";

const RecordItem = ({ record, showModal, handleCancel }) => {
  const recordIcons = {
    Expense: <AiOutlineMinusCircle />,
    Income: <FaCoins />,
  };

  function addCommasToNumber(number) {
    const ans = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }

  return (
    <div className="record container">
    <div className="record_main container">
      <span className="record_icon">{recordIcons[record.type]}</span>
      <div className="record_items container">
        <div className="record_name ">{record.category}</div>
        <div className="record_date ">
          {record.date}
          <div className="record_time ">
            {new Date(record.createdAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>
        <div className="record_amount">₹{addCommasToNumber(record.amount)}</div>
      </div>
    </div>
    </div>

  );
};

export default RecordItem;
