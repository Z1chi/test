import React from "react";

import {TableRow} from "./TableRow/TableRow";
import {TableHead} from "./TableHead/TableHead";
import {TableEmpty} from "./TableEmpty/TableEmpty";
import {Button} from "../Common/Button/Button";
import {Loader} from "../Common/Loader/Loader";

import './table.scss'

export const Table = ({groups, tableConfig, data, emptyTable, fetchMore, isFetching, hasMore, isLoading, onChange}) => {

  if(isLoading) {
    return (
        <div className='table'>
          <TableEmpty {...emptyTable} text='Загрузка' loader={Loader} />
        </div>
    )
  }

  return (
      <>
        <div className='table'>
          {
            data && data.length > 0 ?

                <div className='table__data'>

                  <TableHead tableConfig={tableConfig} groups={groups}/>

                  <div className='table__rowList'>

                    {
                      data.map((row, key) => {
                        return (
                            <TableRow row={row} onChange={onChange} key={`TableRow${key}`} tableConfig={tableConfig}/>
                        )
                      })
                    }

                  </div>

                  { hasMore && <div className='table__load'>
                    {
                      isFetching
                          ? <Button><Loader /></Button>
                          : <Button onClick={()=>fetchMore()}>Load more</Button>
                    }
                  </div> }
                </div>
                : <TableEmpty {...emptyTable}/>
          }
        </div>
      </>
  )

};