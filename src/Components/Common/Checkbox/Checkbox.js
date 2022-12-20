import React from "react";

import selectedIcon from './selected.svg'

import './checkbox.scss'

export const Checkbox = ({ isActive, onChange = () => {} }) => {


  return (

        <div onClick={onChange} className='checkbox__input'>
          {isActive && <img src={selectedIcon} alt="iconChecked"/>}
        </div>


  )
};