import Delete from "@mui/icons-material/Delete";
import { Button, Divider } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { delPrescription } from "../../redux/prescrptionSlice";
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";

export const patienttoday = [
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

export const patientyesterday = [
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

export const afterBefore = [
  { label: "After food" },
  { label: "Before food" },
  { label: "30 min after food" },
  { label: "30 min before food" },
];

export const Drug = [
  { label: "Azithral 500 Tablet" },
  { label: "Hcg 5000IU Injectiont" },
  { label: "Okacet Tablet" },
  { label: "Omez-Dsr Capsule" },
  { label: "Dolo 650 Tablet" },
];
export const Freq = [
  { label: "Once a day" },
  { label: "Twice a day" },
  { label: "Thrice a day" },
  { label: "Once a week" },
  { label: "Twice a week" },
];
export const Duration = [
  { label: "1 week" },
  { label: "2 week" },
  { label: "3 Week" },
  { label: "one month" },
  { label: "A year" },
];

export const columns = [
  { field: "id", headerName: "Sl No", width: 90 },
  {
    field: "Drug",
    headerName: "Drug",
    width: 190,
    editable: true,
  },
  {
    field: "freq",
    headerName: "Frequency",
    width: 150,
    editable: true,
  },
  {
    field: "duration",
    headerName: "Duration",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "inst",
    headerName: "Instruction",
    width: 190,
    editable: true,
  },
  {
    field: "remarks",
    headerName: "Remarks",
    width: 200,
    editable: true,
  },
  {
    field: "Action",
    headerName: "Action",
    width: 125,
    editable: false,
    renderCell: (params) => {
      const dispatch = useDispatch();
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};
        //: Record<string, GridCellValue> =

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        //generatePath("/users/:id", { id: 42 });
        console.log(thisRow);
        dispatch(delPrescription(thisRow.id + 1));
      };

      return (
        <Button onClick={onClick}>
          <Delete />
        </Button>
      );
    },
  },
];

// export const vertLine = () => {
//   return <Divider color="black" variant="middle" orientation="vertical" />;
// };
