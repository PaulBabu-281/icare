import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";
import userSlice from "./userSlice";
import selectedToken from "./tokenSelectSlice"
//import userReducer from "./userSlice";

// const preloadedState = {
//   todos: [
//     {
//       text: "Eat food",
//       completed: true,
//     },
//     {
//       text: "Exercise",
//       completed: false,
//     },
//   ],
//   visibilityFilter: "SHOW_COMPLETED",
// };

export const store = configureStore({
  reducer: {
    user: userSlice,
    token: tokenSlice,
    selectedToken:selectedToken,
    // preloadedState,
  },
});
