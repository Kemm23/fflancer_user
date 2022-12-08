import { configureStore } from "@reduxjs/toolkit";
import freelancerSlice from "~/store/reducers/freelancerSlice";
import customerSlice from "~/store/reducers/customerSlice";

const store = configureStore({
  reducer: {
    freelancerSlice,
    customerSlice
  },
  middleware:  getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
