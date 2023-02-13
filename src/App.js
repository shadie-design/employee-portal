import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, MyProfile, Stacked, Pyramid, Leaves, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Home, Settings, Notifications } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Authentication/Login/Login';

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
      <BrowserRouter>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Login />)} />
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
  );
};

export default App;
