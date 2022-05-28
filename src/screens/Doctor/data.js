import Delete from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import React from "react";

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
    width: 200,
    editable: true,
    renderCell: () => {
      return (
        <Button>
          <Delete />
        </Button>
      );
    },
  },
];
