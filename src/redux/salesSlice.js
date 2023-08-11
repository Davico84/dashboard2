import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAllSls: [],
  getAllSlsUser: {},
  msgerror: "NULL",
  getAllSls2: [],
  getAllSls3: [],
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    getAllSls: (state, action) => {
      state.getAllSls = action.payload;
      state.getAllSls3 = action.payload;
    },
    getAllSlsUser: (state, action) => {
      state.getAllSlsUser = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.msgerror = action.payload;
    },
    getAllSls2: (state, action) => {
      state.getAllSls2 = action.payload;
    },

    searchSale: (state, action) => {
      const results = state.getAllSls3.filter(
        (i) =>
          i.user?.user?.toUpperCase().includes(action.payload.toUpperCase()) ||
          i.id.toUpperCase().includes(action.payload.toUpperCase())
      );
      state.getAllSls = results;
    },
  },
});

export const { getAllSls, getAllSls2, getAllSlsUser, setErrorMsg, searchSale } =
  salesSlice.actions;

export default salesSlice.reducer;
