import React, { useEffect, useState } from 'react';


import './input.scss';

export const Input = ({ required, name, type = 'text', value,  placeholder, isNotChangeable=false, onChange=()=>{}, onChangeValue=(value)=>value, fieldData={},}) => {

  const [inputValue, setInputValue] = useState('');

  useEffect( ()=>{
    setInputValue(value)
  }, [value]);

  return (
      <div className={`customInput ${required && !inputValue ? ' customInput--required':''}`}>
        <div className='customInput__field'>
          <input
              name={name}
              className='customInput__input'
              type={type}
              placeholder={placeholder}
              disabled={isNotChangeable}
              value={inputValue}
              {...fieldData}
              onChange={e => {
                const res = onChangeValue(e.target.value);
                setInputValue(res);
                fieldData.onChange && fieldData.onChange({...e, target: {...e.target, value: res}})
              }}
              onBlur={(e)=>{
                onChange(inputValue);
                fieldData.onBlur && fieldData.onBlur(e)
              }}
          />

        </div>
      </div>
  )
};