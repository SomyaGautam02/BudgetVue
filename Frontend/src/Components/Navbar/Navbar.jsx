import React, { useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import logo from "../../Assets/BV_logo.JPG";
import DropdownProfile from "./DropdownProfile";
import { Link } from "react-router-dom";
import MobileNav from "../Navbar/Mobile Navbar/MobileNav";
import { Modal } from "antd";
import AddRecord from "../Modal/Add_Record/Add_Record";
import AddGoal from "../Modal/Add_Goal/AddGoal";
import "./Navbar.css";

function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="Nav">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img src={logo} alt="IMG" className="logod" />
            BUDGETVUE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
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
                className="nav-item nav-link add_record_btn"
                onClick={showModal}
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
          </div>
        </div>
      </nav>
      {openProfile && <DropdownProfile />}
      {openMenu && <MobileNav />}

      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <AddRecord />
      </Modal>
    </div>
  );
}

export default Navbar;
