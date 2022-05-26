import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const selectedToken = createSlice({
  //name of the state
  name: "selectedToken",
  //intialState valuse are optional remove after testing
  initialState:  { value: 2 },
  // Action is the retrived state or new state to be
  reducers: {
    saveDetails: (state = { initialState }, action) => {
      state.value = action.payload.value;
    },
    updateSelected: (state, action: PayloadAction<number>) => {
        state.value = action.payload
      },
  },
});

// Action creators are generated for each case reducer function
export const { saveDetails,updateSelected } = selectedToken.actions;

export default selectedToken.reducer;
