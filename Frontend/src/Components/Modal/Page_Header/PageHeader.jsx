import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./PageHeader.css";
import AddGoal from "../Add_Goal/AddGoal";
import { Modal } from "antd";

const PageHeader = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="container">
      <div className="container heading">
        <div className="head">
          <h2>{props.section}</h2>
        </div>
        <div className="add_section">
          <Link
            onClick={showModal}
            className={props.status === "true" ? "add_button" : "hidden-button"}
          >
            + Add {props.section}
          </Link>{" "}
        </div>
      </div>
      <hr className="header_hr" />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <AddGoal />
      </Modal>
    </div>
  );
};

export default PageHeader;
