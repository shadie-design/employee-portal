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
const ForgotPassword = () => {
    const { setLoginStatus, isLoggedIn } = useStateContext();
    const initialValue = useRef(true);
    let history = useNavigate();

    const [codeVal, setemailval] = useState("");

    const [isLoginSuccesful, setIsLoginSuccesful] = useState(false);
    const [isLoginInProgress, setIsisLoginInProgress] = useState(false);
    const [emailEntered, setEmailEntered] = useState("");
    const { addToast } = useToasts();


    const handlesubmit = (event) => {
        event.preventDefault();
        setIsisLoginInProgress(true);
        // fetch method
        const LoginUrl = Api.AppBaseUrl + 'ResendCode';
        const Code = "";
        const Email = emailEntered;
        const user = {Code,Email};
        SetCookie('Email',Email);
        fetch(LoginUrl, {
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
                    setIsLoginSuccesful(true)
                    SetCookie('Email',Email);
                        setIsisLoginInProgress(false);
                        addToast(data.message, { appearance: 'success' });
                        history("/verify-account");



                } else {
                        setLoginStatus(true);
                        setIsLoginSuccesful(false);
                        addToast(data.message, { appearance: 'error' });
                        setIsisLoginInProgress(false);
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
                            <p>© 2023 plezo.com, inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="left-side">
                <img src={companyLogo} className="companyLogo" id='img' alt="" />
                    <div className="img-class">
                        <h1 className='textWhite'><u>Forgot Password</u></h1>
                    </div>

                    <form className='formStyle' onSubmit={handlesubmit}>
                        <label htmlFor="emil1">Enter your email address to receive new credentials.</label>
                        <input placeholder="Enter your email address..." required={true} type="email" value={emailEntered}
                            onChange={(e) => { setEmailEntered(e.target.value) }} id="emil1" />
                            {isLoginInProgress === true ? <button id="sub_butt"><CircularProgress
                                                size={16}
                                                color="secondary"
                                                className="buttonProgress"
                                            /></button>  : <button type="submit" id="sub_butt">Send</button>}
                        
                    </form>

                    <div className="createAccount">
                        <h4><Link className='createAccountLink' to='/'>Back to login</Link></h4>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
