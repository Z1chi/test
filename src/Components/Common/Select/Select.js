import React from "react";
import './select.scss'

export const Select = ({options, onChange}) => {

  return (
      <select className='select' defaultValue={'DEFAULT'} onChange={(e) => {

        onChange(e.target.value)
      }}>
        <option disabled value='DEFAULT'>Выберите компанию</option>
        {
          options.map((item, key) => {
            return <option key={key} value={item[Object.keys(item)[0]]}>{item[Object.keys(item)[1]]}</option>
          })
        }

      </select>
  )
};