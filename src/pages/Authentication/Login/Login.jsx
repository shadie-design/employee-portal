import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import plezoLogo from './plezoLogo.png';
import companyLogo from './companyLogo.jpg';
import { useNavigate  } from "react-router-dom";
import { useStateContext } from '../../../contexts/ContextProvider';
import {CircularProgress,} from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import Api from "../../../contexts/Api"

import SetCookie from '../../../Hooks/SetCookie';
import GetCookie from '../../../Hooks/GetCookie';
import RemoveCookie from '../../../Hooks/RemoveCookie';

const Login = () => {
    const { setLoginStatus, isLoggedIn } = useStateContext();
    const initialValue = useRef(true);
    let history = useNavigate ();

    const [emailNumberval, setemailval] = useState("");
    const [passval, setpassval] = useState("");

    const [isLoginSuccesful, setIsLoginSuccesful] = useState(false);
    const [isLoginInProgress, setIsisLoginInProgress] = useState(false);
    const { addToast } = useToasts();

    const handlesubmit = (event) => {
        event.preventDefault();        
        setIsisLoginInProgress(true); 
       // fetch method
       const LoginUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/ConfirmEmployeeExists/' + emailNumberval;
     fetch(LoginUrl, {
        method: 'GET',
        headers: { 
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
           },
      })
    .then(res => res.json())
    .then((data) => {
     if (data.success === true) {
        setLoginStatus(true);
        setIsLoginSuccesful(true);       
        login();

           
        
    }else{
        setLoginStatus(true);
        setIsLoginSuccesful(false);
        addToast(data.errorMessage, { appearance: 'error' }); 
        setIsisLoginInProgress(false);
    }

    });
    }


    const login = () => {       
        setIsisLoginInProgress(true); 
       // fetch method
       const LoginUrl = Api.AppBaseUrl + 'Login';
       const username = emailNumberval;
       const password = passval;
       const sourceSystem = "employee portal";
       const user = { username, password,sourceSystem };

       fetch(LoginUrl, {
        method: 'POST',
        headers: { 
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
           },
        body: JSON.stringify(user)
      })
    .then(res => res.json())
    .then((data) => {
     if (data.success === true) {
        setLoginStatus(true);
        setIsLoginSuccesful(true);       
            //set cookies
            SetCookie('Username', data.data.userName);
            SetCookie('Email', data.data.email);
            SetCookie('Phone', data.data.phoneNumber);
            SetCookie('TenantId', data.data.tenantId);
            SetCookie('Id', data.data.id);
            SetCookie('Token', data.data.token);
            SetCookie('IsLoggedIn', true);

            setTimeout(() => {
                setIsisLoginInProgress(false);
            addToast(data.message, { appearance: 'success' }); 
            history("/home");
              }, 1000)
           
        
    }else{
        setTimeout(() => {
        setLoginStatus(true);
        setIsLoginSuccesful(false);
        addToast(data.message, { appearance: 'error' }); 
        setIsisLoginInProgress(false);
    }, 1000)
    }

    });

       
        

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
                            <p>?? 2023 plezo.com, inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="left-side">
                <img src={companyLogo} className="companyLogo" id='img' alt="" />
                    <div className="img-class">
                        <h1 className='textWhite'><u>Login</u></h1>
                    </div>

                    <form className='formStyle' onSubmit={handlesubmit}>
                        <label htmlFor="emil1">Username</label>
                        <input placeholder="???Enter your email or employee number" required={true} type="text" value={emailNumberval}
                            onChange={(e) => { setemailval(e.target.value) }} id="emil1" />
                        <label htmlFor="pwd1">Password</label>
                        <input  placeholder="Enter password" type="password" required={true} autoComplete="false"
                            value={passval} onChange={(e) => { setpassval(e.target.value) }}
                            id="pwd1" />
                           
                        <h4 className='forgotPasswordLink'><Link className='link' to='/forgot-password'>Forgot password ?</Link></h4>
                   
                            {isLoginInProgress === true ? <button id="sub_butt"><CircularProgress
                                                size={16}
                                                style={{color : "white"}}
                                                className="buttonProgress"
                                            /></button>  : <button type="submit" id="sub_butt">Login</button>}
                        
                    </form>

                    <div className="createAccount">
                        <h4 className='createAccountText'>Dont have an account ?<Link className='createAccountLink' to='/create-account'>Click here</Link></h4>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;
