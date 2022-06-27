import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_name: "",
  user_role: "",
};
export const userSlice = createSlice({
  //name of the state
  name: "user",
  //intialState valuse are optional remove after testing
  initialState,
  // Action is the retrived state or new state to be
  reducers: {
    saveDetails: (state, action) => {
      console.log(action.payload);
      state.user_name = action.payload.user_name;
      state.user_role = action.payload.user_role;
      // state.role = action.payload.user_role;
    },
    addDetails: (state = { initialState }, action) => {
      //state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveDetails } = userSlice.actions;

export default userSlice.reducer;
