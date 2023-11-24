import React, { useEffect, useState } from "react";
import "./DropdownProfile.css";
import { BiLogOut } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { Modal, message } from "antd";
import ChangePassword from "../Modal/Change_Password/ChangePassword";
import DeleteRecords from "../Modal/Delete_Records/DeleteRecords";
import axios from "axios";

const DropdownProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [isDeleteRecordsModalOpen, setIsDeleteRecordsModalOpen] =
    useState(false);

  const handleCancel = () => {
    setIsChangePasswordModalOpen(false);
    setIsDeleteRecordsModalOpen(false);
  };

  const [loginuser, setLoginUser] = useState(user);
  useEffect(() => {
    if (user) {
      setLoginUser(user);
    }
  }, []);
  const user_name = loginuser.data.Name;
  const LogoutHandler = () => {
    var logoutH = window.confirm("Do you really want to Logout?");
    if(logoutH){
      localStorage.removeItem("user");
      message.success("Logged Out");
    }

  };

  const DeleteHandler = async () => {
    var drecord = window.confirm("Do you really want to Delete All Records?");
    if (drecord) {
      try {
        await axios.delete(
          `http://localhost:3001/transactions/delete-transactions/${user.data.Email}`
        );
        message.success("Records Deleted.");
      } catch (error) {
        console.error(error);
      }
    } else {
      message.info("Records is not Deleted.");
    }
  };

  return (
    <div className="Overlay">
      <div className="flex flex-col dropDownProfile">
        <ul className="flex flex-col gap-4">
          <span className="User_name">
            {user_name}
            <hr />
          </span>
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => setIsChangePasswordModalOpen(true)}
          >
            <li>Change Password</li>
          </Link>

          <Link
            className="Logout_text"
            onClick={DeleteHandler}
            style={{ textDecoration: "none", color: "red" }}
          >
            <li style={{ textDecoration: "none", color: "red" }}>
              <span className="Logout_icon">
                <MdDeleteForever />
              </span>
              Delete Records
            </li>
          </Link>

          <Link
            className="Logout_text"
            onClick={LogoutHandler}
            style={{ textDecoration: "none", color: "red" }}
            to="/"
          >
            <li style={{ textDecoration: "none", color: "red" }}>
              <span className="Logout_icon">
                <BiLogOut />
              </span>
              Logout
            </li>
          </Link>


        </ul>
      </div>
      <Modal
        open={isChangePasswordModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        {<ChangePassword userid={user.data.U_id} />}
      </Modal>
    </div>
  );
};

export default DropdownProfile;
