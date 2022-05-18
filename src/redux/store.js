import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
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
    // preloadedState,
  },
});