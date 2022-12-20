import React, {useState} from "react";

import {Input} from "../Common/Input/Input";
import {Button} from "../Common/Button/Button";

import './form.scss'
import {Select} from "../Common/Select/Select";


export const Form = ({
                       data, config, onClick = () => {
  }
                     }) => {

  const [formData, setFormData] = useState(data);

  const inputs = config.filter((item) => item.editable === true);
  const inputsIdRender = inputs.map((item) => item.columnId);

  return (
      <form className='form'>
        {
          Object.entries(formData || {}).map((item, key) => {

                const rowName = inputs.find((i) =>
                    i.columnId === item[0]
                );

                if (inputsIdRender.indexOf(item[0]) + 1) {
                  if (Array.isArray(item[1])) {
                    return <div key={key} className='form__row'>
                      <label>{rowName.columnName}</label>
                      <Select options={item[1]}
                              onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    [item[0]]: [...item[1]].map((i) => {
                                      if (i.companyId === parseInt(e)) {
                                        return {...i, active: true}
                                      } else {
                                        return {...i, active: false}
                                      }
                                    })
                                  })}/>
                    </div>
                  }
                  return (
                      <div className='form__row' key={key}>
                        <label>{rowName.columnName}</label>
                        <Input name={item[0]}
                               onChange={(e) => setFormData({...formData, [item[0]]: e})} type="text"
                               isNotChangeable={!rowName.editable}
                               value={item[1]}/>
                      </div>
                  )
                }
              }
          )}

        <div className='form__buttons'>
          <Button onClick={(e) => {
            e.preventDefault();
            onClick(formData);
          }}>Сохранить</Button>
        </div>
      </form>
  )
};