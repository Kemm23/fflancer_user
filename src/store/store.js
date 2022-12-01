import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/adminSlice";


const store = configureStore({
  reducer: {
    adminReducer
  },
});

export default store;
