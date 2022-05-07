import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
// import PatientDiagnosis from "./PatientDiagnosis";

import {
  GridActionsCellItem,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import {
  randomTraderName,
  // randomUpdatedDate,
  randomQuantity,
} from "@mui/x-data-grid-generator";
import { Grid } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction='up' ref={ref} {...props} />;
// });

// function navigateDiagnosis() {
//   let navigate = useNavigate();
//   navigate("/patientdiagnosis");
// }

export default function TokenView() {
  //let navigate = useNavigate();
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Grid container direction='column' alignItems={"center"}>
      <div style={{ height: 400, width: "80%", marginLeft: 248 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          initialState={{
            pinnedColumns: {
              left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
              right: ["actions"],
            },
          }}
        />
      </div>
      <Grid
        item
        spacing={3}
        sx={{
          paddingTop: 5,
          borderRadius: 2,
          borderWidth: 1,
        }}
      ></Grid>
      {/* <Routes>
        <Route exact path='/tokenview' element={<TokenView />} />
        <Route path='/tokenview/*' element={<PatientDiagnosis />} />;
      </Routes> */}
    </Grid>
  );
}

const columns = [
  {
    field: "tokenNo",
    headerName: "Token Number",
    width: 150,
    type: "number",
    editable: false,
  },
  { field: "name", headerName: "Name", width: 200, editable: false },
  { field: "age", headerName: "Age", type: "number", editable: false },
  {
    field: "temperature",
    headerName: "Body temperature",
    type: "number",
    width: 200,
    //type: 200,
    editable: false,
  },
  {
    field: "pulse",
    headerName: "Pulse rate",
    type: "number",
    width: 150,
    editable: false,
  },
  {
    field: "weight",
    headerName: "Weight",
    type: "number",
    width: 220,
    editable: false,
  },
  {
    field: "actions",
    headerName: "View",
    type: "actions",
    width: 150,
    getActions: () => [
      <Link to={"/admin/patientdiagnosis"}>
        <GridActionsCellItem icon={<Visibility />} label='Show' />,
      </Link>,

      // <GridActionsCellItem icon={<DeleteIcon />} label='Delete' />,
      // <GridActionsCellItem icon={<RestartAlt />} label='Reset Password' />,
    ],
  },
];

const rows = [
  {
    id: 1,
    tokenNo: 1,
    name: randomTraderName(),
    age: 25,
    temperature: 32,
    pulse: 33,
    weight: randomQuantity(),
  },
  {
    id: 2,
    tokenNo: 2,
    name: randomTraderName(),
    age: 36,
    temperature: 37,
    pulse: 33,
    weight: randomQuantity(),
  },
  {
    id: 3,
    tokenNo: 3,
    name: randomTraderName(),
    age: 19,
    temperature: 37,
    pulse: 33,
    weight: randomQuantity(),
  },
  {
    id: 4,
    tokenNo: 4,
    name: randomTraderName(),
    age: 28,
    temperature: 45,
    pulse: 33,
    weight: randomQuantity(),
  },
  {
    id: 5,
    tokenNo: 5,
    name: randomTraderName(),

    age: 23,
    temperature: 48,
    pulse: 33,
    weight: randomQuantity(),
  },
];
