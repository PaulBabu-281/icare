import { createSlice } from "@reduxjs/toolkit";

//import axios from "axios";
var value = [];
const initialState = { value: [] };
// var initialState = [
//   {
//     id: 1,
//     name: "Raju Bhai",
//     tokenNo: 1,
//     age: 35,
//     weight: 75,
//     temperature: 45,
//     BPM: 77,
//     gender: "M",
//   },
//   {
//     id: 2,
//     name: "Rocky Bhai",
//     tokenNo: 2,
//     age: 28,
//     weight: 75,
//     temperature: 45,
//     BPM: 77,
//     gender: "M",
//   },
//   {
//     id: 3,
//     name: "Megatron",
//     tokenNo: 3,
//     age: 22,
//     weight: 75,
//     temperature: 35,
//     BPM: 77,
//     gender: "f",
//   },
//   {
//     id: 4,
//     name: "Go Back",
//     tokenNo: 4,
//     age: 22,
//     weight: 75,
//     temperature: 35,
//     BPM: 77,
//     gender: "F",
//   },
// ];

export const tokenSlice = createSlice({
  //name of the state
  name: "token",
  //intialState valuse are optional remove after testing
  initialState,
  // Action is the retrived state or new state to be
  reducers: {
    addToken: (state, action) => {
      state.name = action.payload.name;
    },
    removeToken: (state = { initialState }, action) => {
      state.name = action.payload.name;
    },
    getToken: (state, action) => {
      console.log(action.payload);
      console.log(state);

      state.value = action.payload;
      //  console.log(state.value);
    },

    initializeState: (state, action) => {
      // https://deploy-test-idoc.herokuapp.com/health/showHealth/

      console.log("state ", state);
      console.log("payload", action.payload);
      // state = action.payload;
    },
  },
});
export const { addToken, initializeState, getToken } = tokenSlice.actions;
export default tokenSlice.reducer;
