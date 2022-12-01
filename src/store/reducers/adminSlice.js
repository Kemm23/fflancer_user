import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import storage from "~/until/storage";

export const isAdmin = createAsyncThunk("admin/isAdmin", async (dataLogin) => {
  const response = await axios.post("https://ffreelancer.herokuapp.com/admin/login", dataLogin);
  return response.data;
});

export const getAccounts = createAsyncThunk("admin/getAccounts", async ({ type, cur, page }) => {
  const response = await axios.get("https://ffreelancer.herokuapp.com/api/admin/account", {
    params: {
      typeUser: type,
      currentPage: cur,
      pageSize: page,
    },
    headers: { Authorization: `Bearer ${storage.get()}` },
  });
  return { type, dataType: response.data };
});

export const createAccount = createAsyncThunk("admin/createAccount", async(account) => {
  const response = await axios.post("https://ffreelancer.herokuapp.com/api/admin/account/create", account, {
    headers: { Authorization: `Bearer ${storage.get()}` }
  })
  console.log(response)
  return response.data;
})

export const getJobs = createAsyncThunk("admin/getJobs", async ({ cur, page }) => {
  const response = await axios.get("https://ffreelancer.herokuapp.com/api/admin/job", {
    params: {
      currentPage: cur,
      pageSize: page,
    },
    headers: { Authorization: `Bearer ${storage.get()}` },
  });
  return response.data;
});

export const getFreelancers = createAsyncThunk("admin/getFreelancers", async ({ cur, page }) => {
  const response = await axios.get("https://ffreelancer.herokuapp.com/api/admin/freelancer", {
    params: {
      currentPage: cur,
      pageSize: page,
    },
    headers: { Authorization: `Bearer ${storage.get()}` },
  });
  return response.data;
});

export const getTransactions = createAsyncThunk("admin/getTransactions", async ({ cur, page }) => {
  const response = await axios.get("https://ffreelancer.herokuapp.com/api/admin/transaction", {
    params: {
      currentPage: cur,
      pageSize: page,
    },
    headers: { Authorization: `Bearer ${storage.get()}` },
  });
  return response.data;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    admins: {},
    users: {},
    freelancers: {},
    jobs: {},
    transactions: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(isAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data;
        switch (action.payload.status) {
          case 200:
            storage.set(data.credential.accessToken, data.account.username, data.account.email);
            break;
          case 0:
            storage.delete();
            break;
          default:
            break;
        }
        console.log("Done", action.payload);
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.dataType.data;
        console.log("Get data success !");
        switch (action.payload.type) {
          case 0:
            state.admins = {
              list: data.list,
              totalPage: data.totalPage,
            };
            break;
          case 1:
            state.users = {
              list: data.list,
              totalPage: data.totalPage,
            };
            break;
          default:
            throw new Error("Error");
        }
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data;
        console.log("Get data success !");
        state.jobs = {
          list: data.list,
          totalPage: data.totalPage,
        };
      })
      .addCase(getFreelancers.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data;
        console.log("Get data success !");
        state.freelancers = {
          list: data.list,
          totalPage: data.totalPage,
        };
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.data;
        console.log("Get data success !");
        state.transactions = {
          list: data.list,
          totalPage: data.totalPage,
        };
      } )
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false
        console.log("Create account success !")
      })
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          state.isLoading = true;
          console.log("Fetching admin from backend ....");
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          console.log("Failed to get admin!!!");
        }
      );
  },
});

const { actions, reducer } = adminSlice;

const adminReducer = reducer;

export default adminReducer;
