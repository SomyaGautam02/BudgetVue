import { Footer } from "antd/es/layout/layout";
import React from "react";
import "./Home.css";
import logo from "../../Assets/BV_logo.JPG";
import { Link } from "react-router-dom";
import pic from "../../Assets/hero3.jpg";
import { IoIosPhonePortrait, IoIosLaptop, IoIosStats } from "react-icons/io";
import { MdFlag, MdMoneyOffCsred } from "react-icons/md";
import {
  FaRegChartBar,
  FaMoneyBillWave,
  FaBullseye,
  FaRegFileAlt,
  FaRegHandshake,
  FaRegLightbulb,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="home_main ">
      <div className="header">
        <div className="header_title">
          <Link to="/">
            <img src={logo} alt="IMG" className="logod" />
            BUDGETVUE
          </Link>{" "}
        </div>
        <div className="header_items ">
          <Link className="header_item" to="/login">
            Login
          </Link>
          <Link className="header_item" to="/register">
            Register
          </Link>
        </div>
      </div>
      <div className="hero_section">
        <div className="hero_title">
          BudgetVue: Your Ultimate Expense Management Companion
          <div className="hero_para">
            Budgeting made easy! Meet BudgetVue, your ultimate expense
            management tracker. Take charge of your finances effortlessly,
            whether you're a seasoned pro or just starting your financial
            journey.
          </div>
        </div>
        <img src={pic} alt="IMG" className="hero" />
      </div>
      <div className="features_section">
        <div className="features_section_heading">Why BudgetVue?</div>
        <div className="features_subsection">
          <div className="feature">
            <FaMoneyBillWave size={48} color="lime" />
            <p>Effortless Expense Tracking</p>
          </div>
          <div className="feature">
            <FaRegChartBar size={48} color="blue" />
            <p>Personalized Budgets</p>
          </div>
          <div className="feature">
            <IoIosStats size={48} color="orange" />
            <p>Real-Time Insights</p>
          </div>

          <div className="feature">
            <MdMoneyOffCsred size={48} color="green" />
            <p>Free of Cost</p>
          </div>
          <div className="feature">
            <IoIosPhonePortrait size={48} color="purple" />
            <IoIosLaptop size={48} color="purple" />
            <p>Cross-Platform Accessibility</p>
          </div>
          <div className="feature">
            <MdFlag size={48} color="red" />
            <p>Goal Setting</p>
          </div>
        </div>
      </div>

      <div className="how_section ">
        <div className="features_section_heading">
          How to Get Your Money in Shape with BudgetVue
        </div>
        <div className="financial-wellness-steps">
          <div className="step">
            <div className="step_icon">
              <FaBullseye size={48} />
            </div>
            <h3>Step 1: Setting Financial Goals</h3>
            <p>Start by setting clear financial goals.</p>
          </div>
          <div className="step">
            <div className="step_icon">
              <FaRegFileAlt size={48} />
            </div>
            <h3>Step 2: Creating a Budget</h3>
            <p>A well-structured budget is the foundation.</p>
          </div>
          <div className="step">
            <div className="step_icon">
              <FaRegHandshake size={48} />
            </div>
            <h3>Step 3: Tracking Your Spending</h3>
            <p>Effective budgeting requires accurate expense tracking.</p>
          </div>
          <div className="step">
            <div className="step_icon">
              <FaRegChartBar size={48} />
            </div>
            <h3>Step 4: Analyzing Your Finances</h3>
            <p>
              BudgetVue provides real-time insights through intuitive charts and
              graphs.
            </p>
          </div>
          <div className="step">
            <div className="step_icon">
              <FaMoneyBillWave size={48} />
            </div>
            <h3>Step 5: Saving and Investing</h3>
            <p>Financial wellness isn't just about managing expenses.</p>
          </div>
          <div className="step">
            <div className="step_icon">
              <FaRegLightbulb size={48} />
            </div>
            <h3>Step 6: Staying on Track</h3>
            <p>Consistency is key to financial wellness.</p>
          </div>
        </div>
      </div>

      <Footer
        className="footer_section"
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          "Navigating Finances with Ease"
        </div>
        BudgetVue ©2023 Created by Somya Gautam
      </Footer>
    </div>
  );
};

export default Home;
