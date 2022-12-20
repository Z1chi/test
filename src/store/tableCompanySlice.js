import {createSlice} from "@reduxjs/toolkit";


export const tableCompanySlice = createSlice({
      name: "tableCompany",
      initialState: {
        data: [],
        activeCompanyId: [],

      },

      reducers: {
        setInitialCompany(state, {payload}) {

          state.data = payload
        },

        calculateWorkersInCompany(state, {payload}) {
          const countWorkersInCompany = payload.reduce((acc, el) => {
            acc[el.companyId] = (acc[el.companyId] || 0) + 1;
            return acc;
          }, {});


          if (Array.isArray(state.data.data)) {
            state.data.data = state.data?.data.map((i) => {
                  return {
                    ...i,
                    number_of_employees: countWorkersInCompany[i.id]
                  }
                }
            )
          }
        },

        setActiveCompany(state, {payload}) {

          const index = state.activeCompanyId.indexOf(payload);
          if (index > -1) {
            state.activeCompanyId.splice(index, 1)
          } else {
            state.activeCompanyId.push(payload)
          }
        },

        setActiveAllCompany(state) {
          if (state.activeCompanyId.length && state.activeCompanyId.length === state.data.data.length) {
            state.activeCompanyId = []
          } else {
            state.activeCompanyId = state.data.data.map(item => item.id)
          }
        },


        setUnActiveWorkers(state) {
          state.activeWorkersId = []
        },

        removeCompany(state, {payload}) {
          state.data.data = state.data.data.filter((item) => item.id !== payload)
        },

        removeSelectedCompany(state, {payload}) {

          state.data.data = state.data.data.filter((item) => !payload.includes(item.id))
        },

        editCompanyData(state, action) {
          state.data.data = state.data.data.map((i) => {
            if (i.id === action.payload.id) {
              return action.payload
            }
            return i
          })
        },
        createCompany(state, {payload}) {
          state.data.data = [...state.data.data, payload]
        }

      }
    }
);

export default tableCompanySlice.reducer

export const {
  setInitialCompany, setActiveCompany, setActiveAllCompany, createCompany,
  setUnActiveWorkers, removeCompany, editCompanyData, calculateWorkersInCompany
} = tableCompanySlice.actions;