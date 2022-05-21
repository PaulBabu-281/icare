import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    name: "Raju Bhai",
    tokenNo: 1,
    age: 35,
    weight: 75,
    temperature: 45,
    BPM: 77,
  },
  {
    id: 2,
    name: "Rocky Bhai",
    tokenNo: 2,
    age: 28,
    weight: 75,
    temperature: 45,
    BPM: 77,
  },
  {
    id: 3,
    name: "Megatron",
    tokenNo: 3,
    age: 22,
    weight: 75,
    temperature: 35,
    BPM: 77,
  },
  {
    id: 4,
    name: "Go Back",
    tokenNo: 4,
    age: 22,
    weight: 75,
    temperature: 35,
    BPM: 77,
  },
];

export const tokenSlice = createSlice({
  //name of the state
  name: "token",
  //intialState valuse are optional remove after testing
  initialState,
  // Action is the retrived state or new state to be
  reducers: {
    addToken: (state = { initialState }, action) => {
      state.name = action.payload.name;
    },
    removeToken: (state = { initialState }, action) => {
      state.name = action.payload.name;
    },
  },
});
export const { addToken } = tokenSlice.actions;
export default tokenSlice.reducer;
