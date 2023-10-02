import React, { useEffect, useState } from 'react'
import "./DropdownProfile.css"
import { BiLogOut } from 'react-icons/bi';
import { Link, Navigate,  } from "react-router-dom";
import {message} from "antd"

const DropdownProfile = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  const [loginuser, setLoginUser]=useState(user)
  useEffect(()=>{
      if(user){
        setLoginUser(user)
      }
  },[])
  const user_name = loginuser.data.Name;
  const LogoutHandler=()=>{
    localStorage.removeItem('user');
    message.success("Logged Out");
  }

  return (
    <div className='Overlay'>
    <div className='flex flex-col dropDownProfile'>
        <ul className='flex flex-col gap-4'>
            <span className='User_name'>{user_name}<hr/></span>
            <Link to="/"  style={{ textDecoration: 'none' }}><li>Change Password</li></Link>
            <Link className="Logout_text" onClick={LogoutHandler} style={{ textDecoration: 'none', color: 'red' }} to="/login"><li style={{ textDecoration: 'none', color: 'red' }}><span className='Logout_icon'>< BiLogOut/></span>Logout</li></Link>
        </ul>
    </div>
    </div>

  )
}

export default DropdownProfile