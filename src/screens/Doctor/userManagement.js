// patient details page

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// input dialog
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// input dialogx

import toast from "../../components/snackbar";

import { Box, Button, Grid, Slide } from "@mui/material";
import {
  AccountCircle,
  Add,
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
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserManagement() {
  const [patientList, setPatientList] = React.useState([]);
  const { format } = require("date-fns");

  //  console.log(data);
  // input Dialog

  const [open, setOpen] = React.useState(false);
  const [isloading, setloading] = React.useState(true);

  const fetchPatientList = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/patient",
      //responseType: "stream",
    })
      .then(function (response) {
        console.log(response.data);
        setPatientList(response.data.Patient);
        //dispatch(getToken(response.data.data));
        //return response.data.data;
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  React.useEffect(() => {
    fetchPatientList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // toggle button
  // const [alignment, setAlignment] = React.useState("web");

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
          rows={patientList}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isloading}
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
        {/* <Button
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
        </Button> */}

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
                id="patient_name"
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
                id="patient_mail"
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
                id="patient_age"
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
  { field: "patient_id", headerName: "ID", width: 160, editable: true },
  { field: "patient_name", headerName: "Name", width: 160, editable: true },
  { field: "patient_mail", headerName: "Email", width: 200, editable: true },
  { field: "patient_age", headerName: "Age", type: "number", editable: true },
  { field: "patient_number", headerName: "Number", type: 200, editable: true },
  {
    field: "patient_address",
    headerName: "Address",

    width: 180,
    editable: true,
  },
];
