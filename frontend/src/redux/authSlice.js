import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
        userToken: null,
        profilePhotoUrl: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        setProfilePhotoUrl:(state,action)=>{
            state.profilePhotoUrl=action.payload;
        }
    },
})


export const { setLoading, setUser, setUserToken, setProfilePhotoUrl } = authSlice.actions;
export default authSlice.reducer;



