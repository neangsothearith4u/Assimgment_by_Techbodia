import { createSlice } from "@reduxjs/toolkit";

const countryReducer = createSlice({
  name: "Country",
  initialState: {
    country: [],
  },
  reducers: {
    getAllCountry: (state: any, action: any) => {
      state.country = action.payload;
    },
  },
});

export const { getAllCountry } = countryReducer.actions;
export default countryReducer.reducer;
