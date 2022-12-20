import React from 'react';

import {TableCell} from "../TableCell/TableCell";

import './tableRow.scss';

export const TableRow = ({tableConfig, row, onChange}) => {
  return (
      <div className={`tableRow ${row.active ? "tableRow--active" : ""}`}>
        {
          tableConfig.map(({columnId, columnWidth, renderRowItem, isGroupEnd}, key) => {
            return (
                <TableCell
                    key={`cell${row.id}${key}`}
                    row={row}
                    onChange={onChange}
                    item={row[columnId]}
                    columnWidth={columnWidth}
                    renderRowItem={renderRowItem}
                    isGroupEnd={isGroupEnd}
                    tableConfig={tableConfig}
                />
            )
          })
        }
      </div>
  )
};