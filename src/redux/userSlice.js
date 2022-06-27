import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};
export const userSlice = createSlice({
  //name of the state
  name: "user",
  //intialState valuse are optional remove after testing
  initialState,
  // Action is the retrived state or new state to be
  reducers: {
    saveDetails: (state = { initialState }, action) => {
      console.log(action.payload);
      state = action.payload;
      // state.role = action.payload.user_role;
    },
    addDetails: (state = { initialState }, action) => {
      state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveDetails } = userSlice.actions;

export default userSlice.reducer;
