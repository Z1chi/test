import {createSlice} from "@reduxjs/toolkit";


export const tableWorkersSlice = createSlice({
      name: "tableWorkers",
      initialState: {
        workers: [],
        activeWorkersId: [],
        visibleWorkers: []
      },

      reducers: {
        setInitialWorkers(state, {payload}) {
          state.workers = payload
        },

        showCompanyWorkers(state, {payload}) {

          state.visibleWorkers = state.workers.filter((item) => payload.includes(item.companyId))
        },

        setColorActiveWorker(state) {

          state.visibleWorkers = state.visibleWorkers.map((worker) => {
            if (state.activeWorkersId.includes(worker.id)) {
              return {...worker, active: true}
            } else {
              return {...worker, active: false}
            }
          })
        },
        setActiveWorker(state, action) {
          const index = state.activeWorkersId.indexOf(action.payload);
          if (index > -1) {
            state.activeWorkersId.splice(index, 1)
          } else {
            state.activeWorkersId.push(action.payload)
          }
        },

        setActiveAllWorkers(state) {
          if (state.activeWorkersId.length > 0 && state.activeWorkersId.length === state.visibleWorkers.length) {
            state.activeWorkersId = []
          } else {
            state.activeWorkersId = state.visibleWorkers.map(item => item.id)
          }
        },
        removeWorkersByIdCompany(state, {payload}) {

          state.workers = state.workers.filter((i) => i.companyId !== payload);
          state.visibleWorkers = state.visibleWorkers.filter((i) => i.companyId !== payload)

        },

        removeWorker(state, action) {
          state.workers = state.workers.filter((item) => item.id !== action.payload);
          state.visibleWorkers = state.visibleWorkers.filter((item) => item.id !== action.payload)
        },

        removeSelectedWorkers(state, {payload}) {
          state.workers = state.workers.filter((item) => !payload.includes(item.id));
          state.visibleWorkers = state.visibleWorkers.filter((item) => !payload.includes(item.id))
        },

        editWorkersData(state, {payload}) {
          state.workers = state.workers.map((i) => {
            if (i.id === payload.id) {
              return payload
            }
            return i
          });
          state.visibleWorkers = state.visibleWorkers.map((i) => {
            if (i.id === payload.id) {
              return payload
            }
            return i
          });
        },
        createWorker(state, {payload}) {
            state.workers = [...state.workers, payload]
        }

      }
    }
);

export default tableWorkersSlice.reducer

export const {
  setInitialWorkers, showCompanyWorkers, setColorActiveWorker, removeWorkersByIdCompany, removeWorker,
  editWorkersData, removeSelectedWorkers, setActiveWorker, createWorker

} = tableWorkersSlice.actions;