import React, { useEffect, useState } from 'react';
import { FiEdit, FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";

import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import product9 from '../data/product9.jpg';

import SetCookie from '../../src/Hooks/SetCookie';
import GetCookie from '../../src/Hooks/GetCookie';
import RemoveCookie from '../../src/Hooks/RemoveCookie';
import avatar from '../data/avatar.jpg';
import { MdEdit, MdOutlineCancel } from 'react-icons/md';
import { userProfileSummaryData } from '../data/dummy';
import './MyProfile.css';
//for form
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from './useForm';
import { useToasts } from "react-toast-notifications";
import EmployeeForm from '../../src/components/EmployeeForm';

//custom form
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
  Icon,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import Send from '@material-ui/icons/Send'
import Settings from "@material-ui/icons/Settings"

import 'date-fns'
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);


const MyProfile = () => {
  const { isLoggedIn, setIsLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  let history = useNavigate();
  const userName = GetCookie('Username');
  const userEmail = GetCookie('Email');
  const phoneNumber = GetCookie('Phone');
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const currentLoginStatus = localStorage.getItem('isLoggedIn');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentColor);
      setCurrentMode(currentThemeMode);
    }
    if (currentLoginStatus) {
      setIsLoggedIn(isLoggedIn);
    }
    toggleTab(1);

  }, []);
  const [editProfileImage, setEditProfileImage] = useState();
  //for tabs
  const [toggleState, setToggleState] = useState(1);
  const [tab1bg, setTab1bg] = useState("");
  const [tab2bg, setTab2bg] = useState("");
  const [tab3bg, setTab3bg] = useState("");
  const [text1color, setText1color] = useState("");
  const [text2color, setText2color] = useState("");
  const [text3color, setText3color] = useState("");
  const currentTabColor = "#A7DEB0"
  const toggleTab = (index) => {
    setToggleState(index);
    if (index === 1) {
      setText1color("white");
      setText2color("");
      setText3color("");
      setTab1bg(currentTabColor);
      setTab2bg("");
      setTab3bg("");
    }
    if (index === 2) {
      setText2color("white");
      setText3color("");
      setText1color("");
      setTab1bg("");
      setTab2bg(currentTabColor);
      setTab3bg("");
    }
    if (index === 3) {
      setText2color("");
      setText3color("white");
      setText1color("");
      setTab1bg("");
      setTab2bg("");
      setTab3bg(currentTabColor);
    }
  };

  const toggleEditProfileImage = () => {
    if (editProfileImage === true) {
      setEditProfileImage(false);
    } else {
      setEditProfileImage(true);
    }
  }


  //for form
  const employeeName = GetCookie('Username');
  const [state, setState] = useState({
    date: new Date(),
  })

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      console.log(value)

      if (value !== state.password) {
        return false
      }
      return true
    })
    return () => ValidatorForm.removeValidationRule('isPasswordMatch')
  }, [state.password])

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  }

  const handleChange = (event) => {
    event.persist()
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  //open security grid
  const [open, setOpen] = React.useState(false);

  const {
    username,
    firstName,
    creditCard,
    department,
    subDepartment,
    role,
    mobile,
    oldPassword,
    password,
    confirmPassword,
    gender,
    date,
    email,
  } = state
  return (


    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent
            content="Settings"
            position="Top"
          >
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>

          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && (<ThemeSettings />)}



            <div className="mt-8">
              {/* <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-400">My Leaves</p>
                      <p className="text-2xl">4</p>
                    </div>
                    <button
                      type="button"
                      style={{ backgroundColor: currentColor }}
                      className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                    >
                      <FiEdit />
                    </button>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => { history("/leaves") }}
                      style={{ backgroundColor: currentColor, color: "white", borderRadius: "10px" }}
                      className={`  p-3  hover:drop-shadow-xl hover:bg-none`}
                    >View all
                    </button>
                  </div>
                </div>
                <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
                  {earningData.map((item) => (
                    <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
                      <button
                        type="button"
                        style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                        className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                      >
                        {item.icon}
                      </button>
                      <p className="mt-3">
                        <span className="text-lg font-semibold">{item.amount}</span>
                        <span className={`text-sm text-${item.pcColor} ml-2`}>
                          {item.percentage}
                        </span>
                      </p>
                      <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div> */}

              <div className="flex gap-10 flex-wrap justify-center">
                {/* For profile summary */}
                <div className=" bg-white dark:bg-secondary-dark-bg p-8 rounded-lg w-96">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg dark:text-gray-200">Profile summary</p>

                    <button
                      type="button"
                      onClick={() => toggleEditProfileImage()}
                      style={{ background: currentColor, borderRadius: '50%' }}
                      className="text-2xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                      <MdEdit color="white" />
                    </button>
                  </div>
                  <div className="flex gap-5 items-center justify-center mt-6 border-color border-b-1 pb-6">
                    <img
                      className="rounded-full h-36 w-36"
                      src={avatar}
                      alt="user-profile"
                    />

                  </div>
                  <div className="mt-5">
                    {editProfileImage === true ? <button
                      type="button"
                      onClick={() => { logout(), setIsClicked(true) }}
                      style={{ backgroundColor: currentColor, color: "white", borderRadius: "10px" }}
                      className={`  p-2 w-full hover:drop-shadow-xl hover:bg-none`}
                    >Change profile picture
                    </button> : ""}


                  </div>
                  <div>
                    {userProfileSummaryData.map((item, index) => (
                      <div key={index} className="flex gap-5 border-b-1 border-color p-4 ">
                        <div
                        
                          style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                          className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                        >
                          {item.icon}
                        </div>

                        <div>
                          <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
                          <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
                {/* For tabs */}
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 rounded-lg md:w-780  ">
                  <div className="tabcontainer">
                    <div className="bloc-tabs">
                      {toggleState === 1 ? <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}
                        style={{ backgroundColor: currentColor, color: text1color }}
                      >
                        Bio data
                      </button> : <button
                        className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(1)}
                      >
                        Bio data
                      </button>}


                      {toggleState === 2 ? <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        style={{ backgroundColor: currentColor, color: text2color }}
                        onClick={() => toggleTab(2)}
                      >
                        Employment details
                      </button> : <button
                        className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(2)}
                      >
                        Employment details
                      </button>}

                      {toggleState === 3 ? <button
                        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                        style={{ backgroundColor: currentColor, color: text3color }}
                        onClick={() => toggleTab(3)}
                      >
                        Security info
                      </button> : <button
                        className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTab(3)}
                      >
                        Security info
                      </button>}

                    </div>

                    <div className="content-tabs">
                      <div
                        className={toggleState === 1 ? "tabcontent  active-content" : "tabcontent"}
                      >



                        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                          <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="First name"
                                  onChange={handleChange}
                                  type="text"
                                  name="firstname"
                                  value={userName || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Sur name"
                                  onChange={handleChange}
                                  type="text"
                                  name="surname"
                                  value={userName || ''}
                                  errorMessages={[
                                    'this field is required',
                                  ]}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Other names"
                                  onChange={handleChange}
                                  type="text"
                                  name="othername"
                                  value={userName || ''}
                                  validators={['required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Full name"
                                  disabled={true}
                                  onChange={handleChange}
                                  type="text"
                                  name="fullname"
                                  value={userName || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Marital status"
                                  onChange={handleChange}
                                  type="text"
                                  name="maritalstatus"
                                  value={userName || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Religion"
                                  onChange={handleChange}
                                  type="text"
                                  name="religion"
                                  value={userName || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Phone Number"
                                  onChange={handleChange}
                                  type="text"
                                  name="mobile"
                                  value={phoneNumber || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Email"
                                  onChange={handleChange}
                                  type="email"
                                  name="email"
                                  value={userEmail || ''}
                                  validators={['required', 'isEmail']}
                                  errorMessages={[
                                    'this field is required',
                                    'email is not valid',
                                  ]}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="ID number"
                                  onChange={handleChange}
                                  type="text"
                                  name="idnumber"
                                  value={mobile || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Employee number"
                                  disabled={true}
                                  onChange={handleChange}
                                  type="text"
                                  name="employeenumber"
                                  value={mobile || ''}
                                  validators={['required']}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                  className="mb-4"
                                  value={gender || ''}
                                  name="gender"
                                  Label="Gender"
                                  onChange={handleChange}
                                  row
                                >
                                  <FormControlLabel
                                    value="Male"
                                    control={<Radio color="default" />}
                                    label="Male"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="Female"
                                    control={<Radio color="default" />}
                                    label="Female"
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="Others"
                                    control={<Radio color="default" />}
                                    label="Others"
                                    labelPlacement="end"
                                  />
                                </RadioGroup>



                              </Grid>

                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <button
                                  type="submit"
                                  onClick={() => { setIsClicked(true) }}
                                  style={{ backgroundColor: currentColor, marginTop: "20px", color: "white", borderRadius: "10px" }}
                                  className={`  p-2 w-full hover:drop-shadow-xl hover:bg-none`}
                                >Update
                                </button>
                              </Grid>
                            </Grid>

                          </div>


                        </ValidatorForm>



                      </div>

                      <div
                        className={toggleState === 2 ? "tabcontent  active-content" : "tabcontent"}
                      >
                        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                          <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Role"
                                  onChange={handleChange}
                                  type="text"
                                  disabled={true}
                                  name="role"
                                  value={role || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Department"
                                  onChange={handleChange}
                                  type="text"
                                  disabled={true}
                                  name="department"
                                  value={department || ''}
                                  errorMessages={[
                                    'this field is required',
                                  ]}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Reporting to"
                                  onChange={handleChange}
                                  type="text"
                                  disabled={true}
                                  name="reportingto"
                                  value={department || ''}
                                  validators={['required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Supervisor"
                                  disabled={true}
                                  onChange={handleChange}
                                  type="supervisor"
                                  name="supervisor"
                                  value={department || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Date hired"
                                  disabled={true}
                                  onChange={handleChange}
                                  type="text"
                                  name="datehired"
                                  value={department || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Start date"
                                  disabled={true}
                                  onChange={handleChange}
                                  type="text"
                                  name="startdate"
                                  value={department || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControlLabel
                                  control={<Checkbox
                                    name="status"
                                    color="default"
                                    checked={true}
                                    disabled={true}
                                    onChange={handleChange}
                                  />}
                                  label="Employee status"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>

                              </Grid>
                            </Grid>



                          </div>


                        </ValidatorForm>
                      </div>

                      <div
                        className={toggleState === 3 ? "tabcontent  active-content" : "tabcontent"}
                      >
                        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                          <div style={{ paddingBottom: 20, paddingTop: 20 }}>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <button
                                  className="p-2 hover:drop-shadow-xl hover:bg-light-gray"
                                  style={{ backgroundColor: "green", color: "white", borderRadius: '10px' }}
                                  onClick={() => setOpen(!open)}
                                >
                                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                  <span className="pl-2">Change Password</span>
                                </button>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                {open === true ? <TextValidator
                                  className="mb-4 w-full"
                                  label="Old Password"
                                  onChange={handleChange}
                                  name="old password"
                                  type="text"
                                  value={oldPassword || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                                  : ""}
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                {open === true ? <TextValidator
                                  className="mb-4 w-full"
                                  label="New Password"
                                  onChange={handleChange}
                                  name="password"
                                  type="password"
                                  value={password || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                /> : ""}
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                {open === true ? <TextValidator
                                  className="mb-4 w-full"
                                  label="Confirm New Password"
                                  onChange={handleChange}
                                  name="confirmPassword"
                                  type="password"
                                  value={confirmPassword || ''}
                                  validators={['required', 'isPasswordMatch']}
                                  errorMessages={[
                                    'this field is required',
                                    "password didn't match",
                                  ]}
                                /> : ""}
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                {open === true ?
                                  <button
                                    type='submit'
                                    className="p-2 w-full hover:drop-shadow-xl hover:bg-light-gray"
                                    style={{ backgroundColor: currentColor, color: text3color, borderRadius: '10px' }}
                                  >
                                    <Settings />
                                    <span className="pl-2">Change Password</span>
                                  </button>
                                  : ""}

                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControlLabel
                                  control={<Checkbox
                                    name="emailverified"
                                    color="default"
                                    checked={true}
                                    disabled={true}
                                    onChange={handleChange}
                                  />}
                                  label="Email verified"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>

                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControlLabel
                                  control={<Checkbox
                                    name="phoneverified"
                                    color="default"
                                    checked={true}
                                    disabled={true}
                                    onChange={handleChange}
                                  />}
                                  label="Phone number verified"
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>

                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="User role"
                                  onChange={handleChange}
                                  name="userrole"
                                  disabled="true"
                                  type="text"
                                  value={'Employee'}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>

                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Last login date"
                                  onChange={handleChange}
                                  name="loginDate"
                                  disabled="true"
                                  type="text"
                                  value={'16 Feb 2023  12:45'}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>

                              </Grid>
                            </Grid>

                          </div>


                        </ValidatorForm>
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>


          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>





  );
};

export default MyProfile;
