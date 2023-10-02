import { Progress } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {
  FaRegEdit,
  FaGraduationCap,
  FaMoneyBillWave,
  FaChild,
} from "react-icons/fa";
import { AiFillCar, AiFillHome } from "react-icons/ai";
import { PiTreePalmFill } from "react-icons/pi";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import { LuPartyPopper } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";

const GoalItem = ({ goal, showModal, handleCancel }) => {
  const categoryIcons = {
    car: <AiFillCar />,
    home: <AiFillHome />,
    education: <FaGraduationCap />,
    holiday_trip: <PiTreePalmFill />,
    health_care: <BsFillCalendarPlusFill />,
    emergency_funds: <FaMoneyBillWave />,
    party: <LuPartyPopper />,
    kids: <FaChild />,
    other: <TbMoneybag />,
  };

  function addCommasToNumber(number) {
    const ans = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return ans;
  }
  const percentage = (goal.saved_amount / goal.amount) * 100;

  return (
    <div className="goals">
      <div className="goal_main container">
        <div className="goal_submain">
          <div className="goal_name">
            <span className="goal_icon">{categoryIcons[goal.category]}</span>
            <span className="goal_name">{goal.goal_name}</span>
          </div>
          <Progress
            className="per_bar"
            strokeColor="#C1ff72"
            percent={parseFloat(percentage).toFixed(0)}
            status="active"
          />
          <div className="goal_subsection">
            <div className="goal_amount">
              {goal.amount - goal.saved_amount > 0
                ? `₹${addCommasToNumber(goal.amount - goal.saved_amount)}`
                : "Achieved🎉"}
            </div>
            <div className="edit_icon">
              <Link className="edit_btn" onClick={() => showModal(goal._id)}>
                <FaRegEdit />
              </Link>
            </div>
          </div>
        </div>
        <div className="target_date">
          <span>Desired Date:</span>
          {goal.date}
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
