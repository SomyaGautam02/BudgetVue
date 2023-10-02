import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {Input, message} from "antd"
import "./Login.css";
import logo from "../Login/BV_logo.png"

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        console.log("login: " + res.data);
        if (res.data.Status === "Success") {
          message.success("Logged In");
          navigate("/dashboard")
          localStorage.setItem('user',JSON.stringify({...res,password:""}))
        } else {
          alert(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // useEffect(()=>{
  //   if(localStorage.getItem('user')){
  //     navigate('/dashboard')
  //   }
  // },[navigate])

  return (
    <div  className="login_page">
      <div className="col-sm-3 col-md-3 col-lg-3 base">
        <div className="Login">
        <img src={logo} alt="IMG" className="logo"/>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <strong>Email</strong>
              <Input
              required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-3">
              <strong>Password</strong>
              <Input.Password
              required
                placeholder="Input Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="l_button login_button">
              Login
            </button>
          </form>
          <p className="para">Don't have an <span className="para_a">account</span>?</p>
          <Link to="/register" className="l_button">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
