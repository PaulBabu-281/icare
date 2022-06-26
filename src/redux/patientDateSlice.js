import { createSlice } from "@reduxjs/toolkit";
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";

const value = {};
const initialState = value;
let count = 0;
let day = true;

export const savePatientsDay = createSlice({
  //name of the state
  name: "savePatientsDay",
  //intialState valuse are optional remove after testing
  initialState: initialState,
  // Action is the retrived state or new state to be
  reducers: {
    updatePatientList: (state = { initialState }) => {
      console.log("inside list");
      if (day) {
        state.value = patienttoday;
      } else state.value = patientyesterday;

      day = !day;
      console.log(state);
    },
    updatePrepList: (state, action) => {
      state.push(action.payload);
      state = { ...state, modalOpen: true };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePatientList, updatePrepList } = savePatientsDay.actions;

export default savePatientsDay.reducer;

const patienttoday = [
  {
    id: 1,
    name: randomTraderName(),
    email: randomEmail(),
    age: 33,
    dis: "Headache",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    email: randomEmail(),
    age: 55,
    dis: "Chest pain",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    email: randomEmail(),
    age: 19,
    dis: "Fever",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    email: randomEmail(),
    age: 20,
    dis: "Broken leg",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    email: randomEmail(),
    age: 25,
    dis: "Fever",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

const patientyesterday = [
  {
    id: 1,
    name: randomTraderName(),
    email: randomEmail(),
    age: 33,
    dis: "Headache",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    email: randomEmail(),
    age: 55,
    dis: "Chest pain",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    email: randomEmail(),
    age: 19,
    dis: "Fever",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    email: randomEmail(),
    age: 20,
    dis: "Broken leg",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    email: randomEmail(),
    age: 25,
    dis: "Fever",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
