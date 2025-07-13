import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    isAuth: localStorage.getItem("userInfo") ? true : false,
    loading: false,
    error: null,
    success: false,
    message: "" 
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            state.isAuth = true;
            state.loading = false;
            state.error = null;
            state.success = true;
            state.message = "Login successful"; 

        },
        clearCredentials: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
            state.isAuth = false;
            state.loading = false;
            state.error = null;
            state.success = false;
            state.message = "Logout successful";
        }
    }
})

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer; 