import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import userSlice from "./userSlice";
import selectedToken from "./tokenSelectSlice";
import savePrescrption from "./prescrptionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    token: tokenSlice,
    selectedToken: selectedToken,
    savePrescrption: savePrescrption,
    // preloadedState,
  },
});
