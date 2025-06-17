import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    username: "",
    email: "",
    role: "",
    isAuth: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser : ( state, action) => {
            const { _id, username,  role, email } = action.payload;
            state._id = _id;
            state.username =  username;
            state.email = email;     
            state.role = role;            
            state.isAuth = true;
        },

        removeUser : (state) => {
            state._id = "";
            state.username = "";
            state.role = "";
            state.email = "";
            state.isAuth = false;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer