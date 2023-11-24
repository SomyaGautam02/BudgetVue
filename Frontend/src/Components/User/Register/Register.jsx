import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Login/BV_logo.png";
import "../Register/Register.css";
import { Input, message } from "antd";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("http://localhost:3001/register", { name, email, password })
        .then((res) => {
          if (res.data.Status === "oldUser") {
            message.error("User Already Exists!");
          } else {
            message.success("User Created Sucessfully!");
            navigate("/login");
          }
        });
    } catch (error) {
      message.error("Failed to add Account");
    }
  };

  return (
    <div className="register_page">
      <div className="col-sm-3 col-md-3 col-lg-3 base_r">
        <div className="Register">
          <img src={logo} alt="IMG" className="logo" />
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <strong>Name</strong>
              <Input
                type="text"
                placeholder="Enter Full Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <strong>Email</strong>
              <Input
                type="email"
                required
                placeholder="Enter Valid Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <strong>Create Password</strong>
              <Input.Password
                placeholder="Enter Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="r_button register_button">
              Register
            </button>
          </form>

          <p className="para">
            Already have an <span className="para_a">account</span>?
          </p>
          <Link to="/login" className="r_button">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
