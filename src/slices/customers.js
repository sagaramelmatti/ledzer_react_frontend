import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CustomerDataService from "../services/CustomerDataService";

const initialState = [];

export const retrieveCustomers = createAsyncThunk(
  "customers/retrieve",
  async () => {
    const res = await CustomerDataService.getAll();
    return res.data;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: {
    
    [retrieveCustomers.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    
  },
});

const { reducer } = customerSlice;
export default reducer;