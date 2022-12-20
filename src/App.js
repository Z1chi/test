import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'

import TableWorkers from "./Components/Template/TableWorkers/TableWorkers";
import TableCompany from "./Components/Template/TableCompany/TableCompany";

import {companyRecords} from "./mock/mockTable";
import {companyWorkers} from "./mock/mockTable";
import {tableCompanySlice} from "./store/tableCompanySlice";


import {tableWorkersSlice} from "./store/tableWorkersSlice";
import './App.scss'

function App() {

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const tableCompanyData = useSelector((state) => state.table);
  const tableWorkersData = useSelector((state) => state.tableWorkers);


  const {
    setInitialCompany, calculateWorkersInCompany
  } = tableCompanySlice.actions;


  const {setInitialWorkers, showCompanyWorkers, setColorActiveWorker,} = tableWorkersSlice.actions;


  useEffect(() => {

    dispatch(setInitialCompany(companyRecords));
    setIsLoading(false);
    dispatch(setInitialWorkers(companyWorkers))


  }, []);

  useEffect(() => {

    if (tableCompanyData.data.data) {
      dispatch(showCompanyWorkers(tableCompanyData.activeCompanyId))
    }

  }, [tableCompanyData.activeCompanyId]);

  useEffect(() => {

    dispatch(setColorActiveWorker(tableWorkersData.activeWorkersId));

  }, [tableWorkersData.activeWorkersId]);

  useEffect(() => {
    console.log(tableWorkersData.workers)
    dispatch(calculateWorkersInCompany(tableWorkersData.workers))

  }, [tableWorkersData.workers]);


  return (
      <div className="App">
        <TableCompany
            tableData={tableCompanyData}
            isLoading={isLoading}
        />
        <TableWorkers
            companyData={tableCompanyData.data.data}
            tableData={tableWorkersData}
        />

      </div>
  );
}

export default App;
