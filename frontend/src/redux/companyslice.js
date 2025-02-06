import { createSlice } from "@reduxjs/toolkit";


const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: "",
        allCompanies: []

    }, reducers: {
        setAllSingleCompany(state, action) {
            state.singleCompany = action.payload
        },
        setAllCompanies(state, action) {
            state.allCompanies = action.payload
        }
    }
})

export const { setAllSingleCompany, setAllCompanies } = companySlice.actions
export default companySlice.reducer;