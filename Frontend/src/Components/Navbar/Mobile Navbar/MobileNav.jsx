import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./MobileNav.css";
import { BiSolidUserCircle } from "react-icons/bi";
import DropdownProfile from "../DropdownProfile";
import { Modal } from "antd";
import AddRecord from "../../Modal/Add_Record/Add_Record";

const MobileNav = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mobile_nav1">
      <div className="navbar-nav">
        <Link className="nav-item nav-link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-item nav-link" to="/records">
          Records
        </Link>
        <Link className="nav-item nav-link" to="/goals">
          Goals
        </Link>
        <Link className="nav-item nav-link" to="/budget">
          Budget
        </Link>
        <Link
          className="nav-item nav-link "
          onClick={showModal}
          style={{
            backgroundColor: "green",
            border: "solid  white .1rem",
            color: "white",
          }}
        >
          + Add Record
        </Link>
        <div
          className="nav-link profile_icon"
          onClick={() => setOpenProfile((prev) => !prev)}
        >
          <BiSolidUserCircle />
        </div>
      </div>
      {openProfile && <DropdownProfile />}
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <AddRecord />
      </Modal>
    </div>
  );
};

export default MobileNav;
