import React, { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import "../../pages/Authentication/Login/Login.css"
import { useStateContext } from '../../contexts/ContextProvider';
export default function Input(props) {
    const { name, label, value,error=null, onChange, ...other } = props;
    const { isLoggedIn, setIsLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
    const [themeModeStatus, setThemeModeStatus] = useState("");
    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          setCurrentColor(currentColor);
          setCurrentMode(currentThemeMode);
        }
    
      }, []);
    return (
        <div>
        {currentMode === "dark" ?   <TextField
        variant="outlined"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        inputStyle={{ backgroundColor: 'red' }}
    /> :   <TextField
    variant="outlined"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    inputStyle={{ backgroundColor: 'red' }}
    {...other}
    {...(error && {error:true,helperText:error})}
/>}
</div>
    )
}
