import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Rahul",
    role: "Doctor",
    age: "32",
  },
  {
    name: "Sam",
    role: "Admin",
    age: "32",
  },
];

export const userSlice = createSlice({
  //name of the state
  name: "user",
  //intialState valuse are optional remove after testing
  initialState,
  // Action is the retrived state or new state to be
  reducers: {
    saveDetails: (state = { initialState }, action) => {
      state.name = action.payload.name;
    },
    addDetails: (state = { initialState }, action) => {
      state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveDetails } = userSlice.actions;

export default userSlice.reducer;
