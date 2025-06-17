import { configureStore } from "@reduxjs/toolkit";
import userSlice from  "../redux/slices/userSlice"

const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export default store;