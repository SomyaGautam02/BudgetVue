import React from "react";
import "../RecentExpense.css";

const LastRecordItems = ({ record }) => {
  function addCommasToNumber(number) {
    const ans = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }
  return (
    <div className="last_records">
      <div
        className={
          record.type === "Income" ? "class_dot" : "class_dot class_expense"
        }
      ></div>
      <div className="last_record_name">{record.category}</div>
      <div className="last_record_date ">{record.date}</div>
      <div className="last_record_amount">
        ₹{addCommasToNumber(record.amount)}
      </div>
    </div>
  );
};

export default LastRecordItems;
