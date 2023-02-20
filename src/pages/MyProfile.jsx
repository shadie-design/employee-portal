import React, { useEffect, useState } from 'react';
import {FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from "react-router-dom";

import SetCookie from '../../src/Hooks/SetCookie';
import GetCookie from '../../src/Hooks/GetCookie';
import avatar from '../data/avatar.jpg';
import { MdEdit,} from 'react-icons/md';
import { userProfileSummaryData } from '../data/dummy';
import './MyProfile.css';
//for form
import { makeStyles } from '@material-ui/core/styles'
import { useToasts } from "react-toast-notifications";
//custom form
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
  Icon,
  Typography,
  CircularProgress,
  Grid,
  Radio,
  TextField,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import Send from '@material-ui/icons/Send'
import Settings from "@material-ui/icons/Settings"
import Api from "../contexts/Api"
import 'date-fns'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 230,


    },
    minHeight: 800
  },
  radio: {
    '&$checked': {
      color: '#4B8DF8'
    }
  },
  checked: {}

}))

const MyProfile = () => {
  const { isLoggedIn, setIsLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  let history = useNavigate();
  const classes = useStyles();
  const { addToast } = useToasts();
  const userName = GetCookie('Username');
  const userEmail = GetCookie('Email');
  const phoneNumber = GetCookie('Phone');

  //--form fields start
  //security info
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [userRole, setUserRole] = useState(false);
  const [dateLastLoggedIn, setDateLastLoggedIn] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //employment details
  const [departmentName, setDepartmentName] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState(false);
  const [jobTitleName, setJobTitleName] = useState("");
  const [managerJobTitleName, setManagerJobTitleName] = useState("");
  const [natureOfEmploymentName, setNatureOfEmploymentName] = useState("");
  const [subDepartmentName, setSubDepartmentName] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [reportToName, setReportToName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [number, setNumber] = useState("");
  const [managerName, setManagerName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religionName, setReligionName] = useState("");
  const [email, setEmail] = useState("");
  const [personalPhoneNumber, setPersonalPhoneNumber] = useState("");
  const [identityDocumentNumber, setIdentityDocumentNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  //--form fields end


  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const currentLoginStatus = localStorage.getItem('isLoggedIn');
    GetEmployeeData();
    GetEmployeeUserInfo();
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentColor);
      setCurrentMode(currentThemeMode);
    }
    if (currentLoginStatus) {
      setIsLoggedIn(isLoggedIn);
    }
    toggleTab(1);

  }, []);

  const GetEmployeeData = () => {
    const employeeDataUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/GetEmployeeData/' + userName;
    fetch(employeeDataUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetCookie("Token")}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        //console.log(data);
        if (data.success === true) {
          SetCookie('IsLoggedIn', true);
          //employment details

          setDepartmentName(data.data.departmentName);

          setEmployeeStatus(data.data.employeeStatus);
          setEmploymentDate(data.data.employmentDate);
          setJobTitleName(data.data.jobTitleName);
          setManagerJobTitleName(data.data.managerJobTitleName);
          setNatureOfEmploymentName(data.data.natureOfEmploymentName);
          setNumber(data.data.number);
          setSubDepartmentName(data.data.subDepartmentName)
          setReportToName(data.data.reportToName);
          setStartDate(data.data.startDate);
          setManagerName(data.data.managerName)
          //bio data
          setFirstName(data.data.firstName)
          setSurName(data.data.surName)
          setOtherNames(data.data.otherNames);
          setDateOfBirth(data.data.dateOfBirth);
          setGender(data.data.gender);
          setFullName(data.data.fullName);
          setMaritalStatus(data.data.maritalStatus);
          setReligionName(data.data.religionName);
          setEmail(data.data.email);
          setPersonalPhoneNumber(data.data.personalPhoneNumber);
          setIdentityDocumentNumber(data.data.identityDocumentNumber)
          setPhysicalAddress(data.data.physicalAddress)
          setPostalAddress(data.data.postalAddress)
          setPostalCode(data.data.postalCode);

        } else {
          SetCookie('IsLoggedIn', false);
          addToast(data.errorMessage, { appearance: 'error' });
        }

      });
  }

  const GetEmployeeUserInfo = () => {
    const employeeDataUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/GetEmployeeUserInfoByName/' + userName;
    fetch(employeeDataUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetCookie("Token")}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          SetCookie('IsLoggedIn', true);
          //employment details

          setEmailVerified(data.data.emailConfirmed);
          setPhoneVerified(data.data.phoneNumberConfirmed);
          setUserRole(data.data.selectedRolesStr)
          setDateLastLoggedIn(data.data.datelastModified);

        } else {
          addToast(data.errorMessage, { appearance: 'error' });
        }

      });
  }

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
    setOpen(false);
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
      if (value !== password) {
        return false
      }
      return true
    })
    return () => ValidatorForm.removeValidationRule('isPasswordMatch')
  }, [password])

  useEffect(() => {

  }, [])

  const onChangePassword = (event) => {
    event.preventDefault()
    if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
      setIsChangePasswordFormValid(true);
    } else {
      setIsChangePasswordFormValid(false);
    }
  }

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
  const [changeInProgress, setChangeInProgress] = useState(false);

  //change password method
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setChangeInProgress(true);
    // fetch method
    const setPassowrdUrl = Api.AppBaseUrl + 'ChangePassword';
    const Id = GetCookie("Id");
    const CurrentPassword = oldPassword;
    const NewPassword = password;
    const user = { Id, CurrentPassword, NewPassword };

    if (confirmPassword !== NewPassword) {
      addToast("Password mismatch", { appearance: 'warning' });
      setChangeInProgress(false);
    } else {
      fetch(setPassowrdUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then((data) => {
          if (data.success === true) {
            setTimeout(() => {
              setChangeInProgress(false);
              addToast(data.message, { appearance: 'success' });
              setOpen(false);
              history("/");
            }, 1000)


          } else {
            setTimeout(() => {
              addToast(data.message + data.errorMessage, { appearance: 'error' });
              setChangeInProgress(false);
            }, 1000)
          }

        });
    }
  }



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
                                <TextField
                                  className="mb-4 w-full"
                                  label="First name"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="firstname"
                                  variant="standard"
                                  value={firstName || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Sur name"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="surname"
                                  value={surName || ''}

                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Other names"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="othername"
                                  value={otherNames || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Full name"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="fullname"
                                  value={fullName || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Marital status"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="maritalstatus"
                                  value={maritalStatus || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Religion"
                                  onChange={handleChange}
                                  disabled={true}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="religion"
                                  value={religionName || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Phone Number"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="mobile"
                                  value={personalPhoneNumber || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Email"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="email"
                                  name="email"
                                  value={email || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="ID number"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="idnumber"
                                  value={identityDocumentNumber || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Employee number"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="employeenumber"
                                  value={number || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormLabel style={{ color: (currentMode === 'Dark') && 'white' }}>Gender</FormLabel>
                                <RadioGroup
                                  className="mb-4"
                                  value={gender || ''}
                                  name="gender"
                                  onChange={handleChange}
                                  row
                                >
                                  <FormControlLabel
                                    value="Male"
                                    control={<Radio disabled={true} checked={gender === "Male"} color='default' disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                                    label={<Typography style={{ color: (currentMode === 'Dark') && 'white' }}>Male</Typography>}
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="Female"
                                    control={<Radio disabled={true} checked={gender === "Female"} color='default' disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                                    label={<Typography style={{ color: (currentMode === 'Dark') && 'white' }}>Female</Typography>}
                                    labelPlacement="end"
                                  />
                                  <FormControlLabel
                                    value="Others"
                                    control={<Radio disabled={true} checked={gender === "Other"} color='default' disableRipple classes={{ root: classes.radio, checked: classes.checked }} />}
                                    label={<Typography style={{ color: (currentMode === 'Dark') && 'white' }}>Other</Typography>}
                                    labelPlacement="end"
                                  />
                                </RadioGroup>



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
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  disabled={true}
                                  name="role"
                                  value={jobTitleName || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Department"
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  disabled={true}
                                  name="department"
                                  value={departmentName || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Reporting to"
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  disabled={true}
                                  name="reportingto"
                                  value={reportToName || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Supervisor"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="supervisor"
                                  name="supervisor"
                                  value={managerName || ''}
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
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="datehired"
                                  value={employmentDate || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="Start date"
                                  disabled={true}
                                  onChange={handleChange}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  type="text"
                                  name="startdate"
                                  value={startDate || ''}
                                />
                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControlLabel
                                  control={<Checkbox
                                    name="status"
                                    color="default"
                                    checked={employeeStatus}
                                    disabled={true}
                                    onChange={handleChange}
                                    style={{ color: (currentMode === 'Dark') && 'white' }}
                                  />}
                                  label={<Typography style={{ color: (currentMode === 'Dark') && 'white' }}>Employee status</Typography>}
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
                                <TextValidator
                                  className="mb-4 w-full"
                                  label="User Name"
                                  disabled={true}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  name="username"
                                  type="text"
                                  value={userName || ''}
                                />
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>

                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <button
                                  className="p-2 hover:drop-shadow-xl hover:bg-light-gray"
                                  style={{ backgroundColor: "#3F51B5", color: "white", borderRadius: '10px' }}
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
                                  onChange={(e) => { setOldPassword(e.target.value), onChangePassword, handleChange }}
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  name="old password"
                                  type="text"
                                  value={oldPassword || ''}
                                  validators={['required']}
                                  errorMessages={['this field is required']}
                                />
                                  : ""}
                              </Grid>
                            </Grid>
                            {open === true ?
                              <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <TextValidator
                                    className="mb-4 w-full"
                                    label="New Password"
                                    onChange={(e) => { setPassword(e.target.value), onChangePassword, handleChange }}
                                    InputLabelProps={{
                                      style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                    }}
                                    InputProps={{
                                      style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                    }}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                  />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <TextValidator
                                    className="mb-4 w-full"
                                    label="Confirm New Password"
                                    onChange={(e) => { setConfirmPassword(e.target.value), onChangePassword, handleChange }}
                                    InputLabelProps={{
                                      style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                    }}
                                    InputProps={{
                                      style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                    }}
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword || ''}
                                    validators={['required', 'isPasswordMatch']}
                                    errorMessages={[
                                      'this field is required',
                                      "password didn't match",
                                    ]}
                                  />
                                </Grid>
                              </Grid>
                              : ""}
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                              </Grid>
                              <Grid item lg={6} md={6} sm={12} xs={12}>


                                {open === true ? <div>
                                  <button
                                    hidden={oldPassword === "" || password === "" || confirmPassword === "" || password !== confirmPassword}
                                    type='submit'
                                    onClick={handlePasswordChange}
                                    className="p-2 w-full hover:drop-shadow-xl hover:bg-light-gray"
                                    style={{ backgroundColor: currentColor, color: text3color, borderRadius: '10px' }}
                                  >
                                    {changeInProgress === false ?<div><span className="pl-2">Change Password</span> <Settings /></div> : <CircularProgress size={16} style={{color : "white"}} className="buttonProgress"/>}
                                    
                                  </button>
                                  <button
                                    hidden={oldPassword !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword}
                                    className="p-2 w-full hover:drop-shadow-xl hover:bg-light-gray"
                                    style={{ backgroundColor: "gray", color: text3color, borderRadius: '10px' }}
                                  >
                                    <Settings />
                                    <span className="pl-2">Change Password</span>

                                  </button>
                                </div>
                                  : " "}




                              </Grid>
                            </Grid>
                            <Grid container spacing={6}>
                              <Grid item lg={6} md={6} sm={12} xs={12}>
                                <FormControlLabel
                                  control={<Checkbox
                                    name="emailverified"
                                    color="default"
                                    checked={emailVerified === true ? true : false}
                                    disabled={true}
                                    onChange={handleChange}
                                    style={{ color: (currentMode === 'Dark') && 'white' }}
                                  />}
                                  label={<Typography style={{ color: (currentMode === 'Dark') && 'white' }}>Email verified</Typography>}
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
                                    checked={phoneVerified === true? true :false}
                                    disabled={true}
                                    onChange={handleChange}
                                    style={{ color: (currentMode === 'Dark') && 'white' }}
                                  />}
                                  label={<Typography style={{ color: (currentMode === 'Dark') && 'white' }}>Phone number verified</Typography>}
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
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  name="userrole"
                                  disabled={true}
                                  type="text"
                                  value={userRole}
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
                                  InputLabelProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  InputProps={{
                                    style: { border: 'none', color: (currentMode === 'Dark') && 'white' }
                                  }}
                                  name="loginDate"
                                  disabled={true}
                                  type="text"
                                  value={dateLastLoggedIn}
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
