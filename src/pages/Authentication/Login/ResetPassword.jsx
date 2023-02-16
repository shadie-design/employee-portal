import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { json, Link } from 'react-router-dom';
import plezoLogo from './plezoLogo.png';
import companyLogo from './companyLogo.jpg';
import { useNavigate } from "react-router-dom";
import { useStateContext } from '../../../contexts/ContextProvider';
import { CircularProgress, } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import Api from "../../../contexts/Api"
import SetCookie from '../../../Hooks/SetCookie';
import GetCookie from '../../../Hooks/GetCookie';
import RemoveCookie from '../../../Hooks/RemoveCookie';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
const ResetPassword = () => {
    const { setLoginStatus, isLoggedIn } = useStateContext();
    const initialValue = useRef(true);
    let history = useNavigate();
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [emailval, setemailval] = useState("");
    const [passval, setpassval] = useState("");
    const [confirmedPassval, setConfirmPassval] = useState("");

    const [isLoginSuccesful, setIsLoginSuccesful] = useState(false);
    const [isLoginInProgress, setIsisLoginInProgress] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        setemailval(localStorage.getItem('Email'));
        setEmployeeNumber(localStorage.getItem('Username'));
    }, []);

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }
    const togglePassword = (event) => {
        event.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    const handlesubmit = (event) => {
        event.preventDefault();
        setIsisLoginInProgress(true);
        // fetch method
        const setPassowrdUrl = Api.AppBaseUrl + 'ResetPassword';
        const Id = localStorage.getItem("Id");
        const CurrentPassword = passval;
        const NewPassword = confirmedPassval;
        const email = emailval;
        const password = passval;
        const user = { password,email};
    
        if(confirmedPassval !== passval){
            addToast("Password mismatch", { appearance: 'warning' });
            setIsisLoginInProgress(false);
        }else{
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
                    console.log(data);
                    if (data.success === true) {
                        setLoginStatus(true);
                        setIsLoginSuccesful(true);
                        setTimeout(() => {
                            setIsisLoginInProgress(false);
                            addToast(data.message, { appearance: 'success' });
                            history("/");
                        }, 1000)
    
    
                    } else {
                        setTimeout(() => {
                            setLoginStatus(true);
                            setIsLoginSuccesful(false);
                            addToast(data.message + data.errorMessage, { appearance: 'error' });
                            setIsisLoginInProgress(false);
                        }, 1000)
                    }
    
                });
        }

     




    }

    return (
        <div className='main-login'>
            <div className="login-contain">

                <div className="right-side">
                    <div className="info-container">
                        <img src={plezoLogo} className="organizationLogo" id='img' alt="" />
                        <div className="textInfoHeader">
                            <p >Start your free trial.</p>
                        </div>
                        <div className='listInfo'>
                            <ol className="list listItems listText">
                                <li className="list-item one"><span>Preloaded data or upload your own</span></li>
                                <li className="list-item two"><span>Preconfigured processes, reports, and dashboards</span></li>
                                <li className="list-item three"><span>Guided experiences for sales reps and administrators</span></li>
                                <li className="list-item four"><span>Online training and live onboarding webinars</span></li>
                            </ol>
                        </div>
                        <div className="footerText">
                            <p>© 2023 plezo.com, inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="left-side">
                    <img src={companyLogo} className="companyLogo" id='img' alt="" />
                    <div className="img-class">
                        <h1 className='textWhite'><u>Reset Password</u></h1>
                    </div>

                    <form className='formStyle' onSubmit={handlesubmit}>
                        <label htmlFor="pwd1">New Password</label>
                            <input placeholder="Enter new password" type={passwordType} required={true} autoComplete="false"
                                value={passval} onChange={(e) => { setpassval(e.target.value) }}
                                id="pwd1" />
                        <label htmlFor="pwd1">Confirm New Password</label>
                        <input placeholder="Confirm new password" type={passwordType} required={true} autoComplete="false"
                            value={confirmedPassval} onChange={(e) => { setConfirmPassval(e.target.value) }}
                            id="pwd1" />

                        {isLoginInProgress === true ? <button id="sub_butt"><CircularProgress
                            size={16}
                            color="secondary"
                            className="buttonProgress"
                        /></button> : <button type="submit" id="sub_butt">Reset password</button>}

                    </form>

                    <div className="createAccount">
                        <h4 className='createAccountText'><Link className='createAccountLink' to='/'>Login</Link></h4>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ResetPassword;
