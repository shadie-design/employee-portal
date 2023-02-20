import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { FiLogOut } from 'react-icons/fi';
import { useToasts } from "react-toast-notifications";
import SetCookie from '../../src/Hooks/SetCookie';
import GetCookie from '../../src/Hooks/GetCookie';
import RemoveCookie from '../../src/Hooks/RemoveCookie';
import Api from '../contexts/Api';
const UserProfile = () => {
  const { currentColor,setIsClicked } = useStateContext();
  let history = useNavigate();
  const { addToast } = useToasts()
  const userName = GetCookie('Username');
  const userEmail = GetCookie('Email');
  const phoneNumber = GetCookie('Phone');

  const logout = () => {
    const employeeName = GetCookie("Username");
    const userToken = GetCookie("Token");
    const logoutUrl = Api.AppBaseUrl + 'Logout/' + employeeName;
    fetch(logoutUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
        },
    })
        .then(res => res.json())
        .then((data) => {
          if (data.success === true) {

            RemoveCookie("Username");
            RemoveCookie("Email");
            RemoveCookie("Phone");
            RemoveCookie("Token");
            RemoveCookie("TenantId");
            SetCookie('IsLoggedIn', false);
            history("/");
            addToast(data.message, { appearance: 'success' }); 
        }else{
            addToast(data.message, { appearance: 'error' }); 
        }
        })
}


  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {userName} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {phoneNumber}   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {userEmail} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} onClick={() => { history(item.link),setIsClicked(true) }} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"              
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={() => { logout(),setIsClicked(true) }}
          style={{ backgroundColor: currentColor, color: "white", borderRadius: "10px" }}
          className={`  p-3 w-full hover:drop-shadow-xl hover:bg-none`}
        >Logout
        </button>

      </div>
    </div>

  );
};

export default UserProfile;
