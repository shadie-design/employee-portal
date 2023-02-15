import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, MyProfile, Stacked, Pyramid, Leaves, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Home, Settings, Notifications } from './pages';
import './App.css';
import { ToastProvider } from "react-toast-notifications";
import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Authentication/Login/Login';
import ForgotPassword from './pages/Authentication/Login/ForgotPassword';
import CreateAccount from './pages/Authentication/Login/CreateAccount';
import VerifyEmail from './pages/Authentication/Login/VerifyEmail';
import VerifyAccount from './pages/Authentication/Login/VerifyAccount';
import SetPassword from './pages/Authentication/Login/SetPassword';
import ResetPassword from './pages/Authentication/Login/ResetPassword';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <ToastProvider autoDismiss={true}>
      <BrowserRouter>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Login />)} />
                <Route path="/forgot-password" element={(<ForgotPassword />)} />
                <Route path="/create-account" element={(<CreateAccount />)} />
                <Route path="/verify-email" element={(<VerifyEmail />)} />
                <Route path="/set-Password" element={(<SetPassword/>)} />
                <Route path="/reset-Password" element={(<ResetPassword/>)} />
                <Route path="/verify-account" element={(<VerifyAccount />)} />
                <Route path="/home" element={(<Home />)} />
                <Route path="/notifications" element={<Notifications />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/my profile" element={<MyProfile />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/settings" element={<Settings />} />
                {/* apps  */}
                <Route path="/calendar" element={<Calendar />} />             

              </Routes>
      </BrowserRouter>
      </ToastProvider>
  );
};

export default App;
