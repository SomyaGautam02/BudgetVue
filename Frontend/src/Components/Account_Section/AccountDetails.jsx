import React, { useEffect, useState } from "react";
import "./AccountDetails.css";
import axios from "axios";

const AccountDetails = () => {
  const [Record, setRecord] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://localhost:3001/transactions/last-transactions/${user.data.Email}`
  //     )
  //     .then((res) => {
  //       setRecord(res.data);
  //       let a=0
  //       if (res[0].type === "Income") {
  //         a += res[0].amount;
  //       } else if (res[0].type === "Expense") {
  //         a -= res[0].amount;
  //       }
  //       setAccountBalance(a);
  //     })
  //     .catch((err) => console.log(err));
  // }, [Record]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/transactions/last-transactions/${user.data.Email}`
      )
      .then((response) => {
        let a = Record.amount;
        const newRecord = response.data;
        if (newRecord._id !== Record._id) {
          if (newRecord.type === "Income") {
            a += newRecord.amount;
          } else if (newRecord.type === "Expense") {
            a -= newRecord.amount;
          }
          setAccountBalance(a);
          setRecord(newRecord);
        } else {
          setAccountBalance(a);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const A = 4000;

  return (
    <div className="Account">
      <div id="Show_Account">
        <div className="Account_Title">Account</div>
        <div className="Account_Money"> ₹{Record.amount}</div>
        {/* <div className="Account_Money"> ₹{accountBalance}</div> */}
      </div>
    </div>
  );
};

export default AccountDetails;
