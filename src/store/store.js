import {configureStore, combineReducers} from "@reduxjs/toolkit";

import tableCompanySlice from './tableCompanySlice'
import tableWorkersSlice from "./tableWorkersSlice";

import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
  table: tableCompanySlice,
  tableWorkers: tableWorkersSlice,

});

const store = configureStore({
  reducer: rootReducer,
}, composeWithDevTools());

export default store