import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
let count = 0;

export const savePrescrption = createSlice({
  //name of the state
  name: "savePrescrption",
  //intialState valuse are optional remove after testing
  initialState: initialState,
  // Action is the retrived state or new state to be
  reducers: {
    delPrescription: (state = { initialState }, action) => {
      state.splice(action.payload, 1);
    },
    updatePrepList: (state, action) => {
      state.push(action.payload);
      state = { ...state, modalOpen: true };
      console.log(state);
    },
    removePrescription: (state, action) => {
      state.splice(0, state.length);
    },
  },
});

// Action creators are generated for each case reducer function
export const { delPrescription, updatePrepList, removePrescription } =
  savePrescrption.actions;

export default savePrescrption.reducer;
