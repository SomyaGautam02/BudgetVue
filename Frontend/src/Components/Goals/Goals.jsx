import AccountDetails from "../Account_Section/AccountDetails";
import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from "react";
import "./Goals.css";
import PageHeader from "../Modal/Page_Header/PageHeader";
import axios from "axios";
import { Modal } from "antd";
import EditGoal from "../Modal/Edit_Goal/EditGoal";
import GoalItem from "./Goal_Item/GoalItem";

// const Goals = () => {
//   const categoryIcons = {
//     car: <AiFillCar />,
//     home: <AiFillHome />,
//     education: <FaGraduationCap />,
//     holiday_trip: <PiTreePalmFill />,
//     health_care: <BsFillCalendarPlusFill />,
//     emergency_funds: <FaMoneyBillWave />,
//     party: <LuPartyPopper />,
//     kids: <FaChild />,
//     other: <TbMoneybag />,
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   function addCommasToNumber(number) {
//     const ans=number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return ans
//   }
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   const [Goals, setGoals] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/goals/get-goals")
//       .then((goals) => {
//         setGoals(goals.data);
//       })
//       .catch((err) => console.log(err));
//   }, [Goals]);
//   return (
//     <div>
//       <Navbar />
//       <AccountDetails />
//       <PageHeader section="Goals" status="true" />
//       {Goals.map((goal) => {
//         return (
//           <>
//             <div className="goals">
//               <div className="goal_main container">
//                 <div className="goal_submain">
//                   <div className="goal_name">
//                     <span className="goal_icon">
//                       {categoryIcons[goal.category]}
//                     </span>
//                     {goal.goal_name}
//                   </div>
//                   <Progress
//                     className="per_bar"
//                     strokeColor="yellow"
//                     percent={70}
//                   />
//                   <div className="goal_subsection">
//                     <div className="goal_amount">
//                     ₹{goal.amount ? addCommasToNumber(goal.amount) : ''}
//                     </div>
//                     <div className="edit_icon">
//                       <Link className="edit_btn" onClick={showModal}>
//                         <FaRegEdit />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="target_date">{goal.date}</div>
//               </div>
//               <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
//                 <EditGoal goalId={goal._id} />
//               </Modal>
//             </div>
//           </>
//         );
//       })}
//     </div>
//   );
// };

// export default Goals;

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalGoalId, setModalGoalId] = useState(null);

  const [Goals, setGoals] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios
      .get(`http://localhost:3001/goals/get-goals/${user.data.Email}`)
      .then((goals) => {
        setGoals(goals.data);
      })
      .catch((err) => console.log(err));
  }, [Goals]);

  const showModal = (goalId) => {
    setIsModalOpen(true);
    setModalGoalId(goalId);
  };

  

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <AccountDetails />
      <PageHeader section="Goals" status="true" />
      {Goals.map((goal) => (
        <GoalItem
          key={goal._id}
          goal={goal}
          showModal={showModal}
          handleCancel={handleCancel}
        />
      ))}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        {<EditGoal goalId={modalGoalId} setIsModalOpen={setIsModalOpen} />}
      </Modal>
    </div>
  );
};

export default Goals;
