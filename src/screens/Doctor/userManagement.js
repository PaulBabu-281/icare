// patient details page

import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
// input dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// input dialogx
import {
  GridActionsCellItem,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";

import {
  Box,
  Button,
  Grid,
  Slide,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Add,
  CalendarMonth,
  Email,
  MedicalServices,
  Password,
  SentimentVerySatisfied,
} from "@mui/icons-material";

// date picker
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useDispatch } from "react-redux";
import { updatePatientList } from "./../../redux/patientDateSlice";

import { patienttoday, patientyesterday } from "./data";

import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserManagement() {
  const data = useSelector((state) => state.savePatientsDay.value);
  const { format } = require("date-fns");

  console.log(data);
  // input Dialog

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // toggle button
  const [alignment, setAlignment] = React.useState("web");

  // "2014-08-18T21:11:54";
  const [value, setValue] = React.useState(format(new Date(), "yyyy-MM-dd"));

  const dispatch = useDispatch();
  let day = true;

  const handleDate = (newValue) => {
    setValue(newValue);
    console.log(newValue);
    if (day) {
      dispatch(updatePatientList(patienttoday));
    } else dispatch(updatePatientList(patientyesterday));
  };

  //
  return (
    <Grid container direction="column" alignItems={"center"}>
      <Grid
        container
        direction="column"
        alignItems={"flex-start"}
        style={{
          paddingBottom: 9,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Search by Date"
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
          />
          {/* <CalendarMonth /> */}
        </LocalizationProvider>
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
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
          // maxWidth: 360,
          borderRadius: 2,
          borderWidth: 1,
        }}
      >
        <Button
          size="large"
          sx={{
            maxWidth: 200,
            // "&:hover": {
            //   background: "#fd830d",
            // },
          }}
          variant="outlined"
          startIcon={<Add />}
          onClick={handleClickOpen}
        >
          Add
        </Button>

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill Fields</DialogContentText>
            {/* {textFieldModified(
              {
                id: "name",
                label: "Name",
                type: "text",
                icon: "AccountCircle",
              }
              //   { ...props }
            )} */}
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SentimentVerySatisfied
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="age"
                label="Age"
                type="number"
                fullWidth
                variant="standard"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <MedicalServices
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="post"
                label="Postion"
                type="text"
                fullWidth
                variant="standard"
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose}>Save</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

// const textFieldModified = ({
//   id = "name",
//   label = "Email",
//   type = "number",
//   icon = "Add",
// } = {}) => {
//   return (
//     <TextField
//       autoFocus
//       margin='dense'
//       id={id}
//       label={label}
//       type={type}
//       fullWidth
//       variant='standard'
//       InputProps={{
//         startAdornment: (
//           <InputAdornment position='start'>{icon}</InputAdornment>
//         ),
//       }}
//     />
//   );
// };
// const addButton = () => {
//   return (
//     <Button variant='outlined' startIcon={<Add />}>
//       Add
//     </Button>
//   );
// };

const columns = [
  { field: "name", headerName: "Name", width: 160, editable: true },
  { field: "email", headerName: "Email", width: 200, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  { field: "dis", headerName: "Disease", type: 200, editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    width: 150,
    getActions: () => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
    ],
  },
];
