import React from 'react';
import { useNavigate  } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width,Click }) => {
  const { setIsClicked, initialState } = useStateContext();
  let history = useNavigate ();
  return (
    <button
      type="button"
      onClick={() => {setIsClicked(initialState),Click}}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
