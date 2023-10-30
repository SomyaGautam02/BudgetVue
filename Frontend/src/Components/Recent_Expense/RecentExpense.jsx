import React, { useEffect, useState } from 'react'
import "./RecentExpense.css"
import axios from 'axios';
import LastRecordItems from './Last_Record_Item/LastRecordItems';

const RecentExpense = () => {
  const [Records, setRecords] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/transactions//get-three-transactions/${user.data.Email}`
      )
      .then((records) => {
        setRecords(records.data);
      })
      .catch((err) => console.log(err));
  }, [Records]);

  return (
    <div className="re_main">
      <span>Recent Records</span>
      <hr />
      <div className="re_subsection">
        {Records.map((record) => (
          <LastRecordItems
            key={record._id}
            record={record}
          />
        ))}
      </div>
    </div>
  );
  
}

export default RecentExpense