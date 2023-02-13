import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import plezoLogo from './plezoLogo.png';
import { useNavigate  } from "react-router-dom";
import { useStateContext } from '../../../contexts/ContextProvider';
import {CircularProgress,} from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
const Login = () => {
    const { setLoginStatus, isLoggedIn } = useStateContext();
    const initialValue = useRef(true);
    let history = useNavigate ();

    const [emailval, setemailval] = useState("");
    const [passval, setpassval] = useState("");

    const [isLoginSuccesful, setIsLoginSuccesful] = useState(false);
    const [isLoginInProgress, setIsisLoginInProgress] = useState(false);
    const { addToast } = useToasts();

    const handlesubmit = (event) => {
        event.preventDefault();
        setIsisLoginInProgress(true);
        if (emailval === "admin@gmail.com" && passval === "admin*1234") {
            setLoginStatus(true);
            setIsLoginSuccesful(true);       
            setTimeout(() => {
                setIsisLoginInProgress(false);
                addToast("Logged in successfully", { appearance: 'success' }); 
                history("/home");
             }, 1000);
            
        }else{
            setLoginStatus(true);
            setIsLoginSuccesful(false);
            setTimeout(() => {
                setIsisLoginInProgress(false);
             }, 1000);
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
                                <li class="list-item one"><span>Preloaded data or upload your own</span></li>
                                <li class="list-item two"><span>Preconfigured processes, reports, and dashboards</span></li>
                                <li class="list-item three"><span>Guided experiences for sales reps and administrators</span></li>
                                <li class="list-item four"><span>Online training and live onboarding webinars</span></li>
                            </ol>
                        </div>
                        <div className="footerText">
                            <p>© 2023 plezo.com, inc. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="left-side">
                    <div className="img-class">
                        <h1 className='textWhite'><u>Login</u></h1>
                    </div>

                    <form className='formStyle' onSubmit={handlesubmit}>
                        <label htmlFor="emil1">Email</label>
                        <input placeholder="Enter your email..." type="email" value={emailval}
                            onChange={(e) => { setemailval(e.target.value) }} id="emil1" />
                        <label htmlFor="pwd1">Password</label>
                        <input  placeholder="Enter password" type="password" autoComplete="false"
                            value={passval} onChange={(e) => { setpassval(e.target.value) }}
                            id="pwd1" />
                            {isLoginInProgress === true ? <button id="sub_butt"><CircularProgress
                                                size={16}
                                                color="white"
                                                className="buttonProgress"
                                            /></button>  : <button type="submit" id="sub_butt">Login</button>}
                        
                    </form>

                    <div className="footer">
                        <h4><Link className='link' to='/Dashboard'>Forgot password ?</Link></h4>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;
