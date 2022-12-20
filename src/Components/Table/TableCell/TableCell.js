import React from 'react';

import './tableCell.scss';

export const TableCell = ({ row, tableConfig, onChange, item, columnWidth, renderRowItem = (item => item), isGroupEnd, onClick = ()=> {}}) => {
    return (
        <div onClick={onClick} className={`tableCell${isGroupEnd ? " tableCell--last" : ""}`}
             style={{minWidth: columnWidth}}>
            {
                renderRowItem(item, row, tableConfig, onChange)
            }
        </div>
    )
};