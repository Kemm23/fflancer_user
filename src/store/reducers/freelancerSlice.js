import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "~/config/fetchApi";

export const getFreelancers = createAsyncThunk("freelancer/getFreelancer", () => API.requestGetAPI("/v1/freelancers"))

export const getListJob = createAsyncThunk("customer/getListJob", (params) => { 
  return API.requestGetAPI("/job/list", params)})

const freelancer = createSlice({
  name: "freelancer",
  initialState: {
    freelancers: [],
    listJob: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFreelancers.fulfilled, (state, action) => {
        state.freelancers = action.payload.data
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

const { reducer } = freelancer;

const freelancerSlice = reducer;

export default freelancerSlice;
