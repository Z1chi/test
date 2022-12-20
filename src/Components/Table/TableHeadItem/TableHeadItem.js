import React from 'react';

import './tableHeadItem.scss';

export const TableHeadItem = ({item, isGroup}) => {

  return (
      <div className={`tableHeadItem${isGroup ? ' tableHeadItem--group' : ''}`}
           style={{minWidth: item.columnWidth, width: '100%'}}>
        <div className='tableHeadItem__text'>
          {
            typeof item.columnName === "function" ?
                item.columnName() : item.columnName
          }
        </div>
        {
          item.info
          && (
              <div className='tableHeadItem__info'>
                <div className='tableHeadItem__message'>
                  {item.info.message}
                </div>
                {item.info.message ? 'i' : ''}
              </div>
          )
        }
      </div>
  )
};