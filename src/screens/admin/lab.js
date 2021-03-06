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
import {
  GridActionsCellItem,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomEmail,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import { Box, Button, Grid, Slide } from "@mui/material";
import {
  AccountCircle,
  Add,
  Email,
  MedicalServices,
  Password,
  SentimentVerySatisfied,
  RestartAlt,
  Visibility,
  Delete,
} from "@mui/icons-material";

import toast from "../../components/snackbar";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Lab() {
  // input Dialog

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    toast.error("something went wrong!");
  };
  // input dialog

  return (
    <Grid container direction="column" alignItems={"center"}>
      <div style={{ height: 400, width: "100%" }}>
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
                id="category"
                label="Category"
                type="text"
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
                id="units"
                label="Units"
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
                id="unitType"
                label="Unit Type"
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
                id="company"
                label="Company"
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
                id="effect"
                label="Effect"
                type="text"
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
  { field: "name", headerName: "Name", width: 160, editable: false },
  {
    field: "patientName",
    headerName: "Patient Name ",
    type: "text",
    width: 220,
    editable: false,
  },
  {
    field: "resultStatus",
    headerName: "Result Status",
    type: "text",
    width: 220,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        // thisRow -> the selected row ,use thisRow to access coloums from the selected row

        //generatePath("/users/:id", { id: 42 });
        //console.log(thisRow);
        // dispatch(updateSelected(Number(thisRow.tokenNo)));

        // navigateToTokenDetails();
      };
      return <Button onClick={onClick}>{<Delete />}</Button>;
    },
  },
];

const rows = [
  {
    id: 1,
    name: "blood count",
    patientName: "Meg",
    resultStatus: "Patient yet to take test",
  },
  {
    id: 2,
    patientName: "Loki",
    name: "thyroid function test",
    resultStatus: "Awaiting result",
  },
  {
    id: 3,
    patientName: "Raj",
    name: "blood count",
    resultStatus: "Result Ready",
  },
];
