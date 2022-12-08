import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "~/config/fetchApi";
import storage from "~/untils/storage";

export const userInfo = createAsyncThunk("customer/userInfo", () => API.requestGetAPI("/api/users/information"))

export const getListJob = createAsyncThunk("customer/getListJob", (params) => { 
  return API.requestGetAPI("/job/list", params)})

const customer = createSlice({
  name: "customer",
  initialState: {
    listJob: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(userInfo.fulfilled, (state, action) => {
            storage.setData(action.payload.data)
           console.log("Success get data")
        })
        .addCase(getListJob.fulfilled, (state, action) => {
          state.listJob = action.payload.data.data
          console.log("Get list job success")
        })
        .addMatcher(
          (action) => {
            return action.type.endsWith("/pending");
          },
          (state, action) => {
            console.log("Fetching data from backend ....");
          }
        )
        .addMatcher(
          (action) => action.type.endsWith("/rejected"),
          (state, action) => {
            console.log("Failed to get data!!!");
          }
        );
  }
});

const { reducer } = customer;

const customerSlice = reducer;

export default customerSlice;
