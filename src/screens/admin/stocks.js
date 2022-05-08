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
} from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function Stocks() {
  // input Dialog

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // input dialog

  return (
    <Grid container direction='column' alignItems={"center"}>
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
          size='large'
          sx={{
            maxWidth: 200,
            // "&:hover": {
            //   background: "#fd830d",
            // },
          }}
          variant='outlined'
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
                margin='dense'
                id='name'
                label='Name'
                type='text'
                fullWidth
                variant='standard'
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin='dense'
                id='category'
                label='Category'
                type='text'
                fullWidth
                variant='standard'
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SentimentVerySatisfied
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                autoFocus
                margin='dense'
                id='units'
                label='Units'
                type='number'
                fullWidth
                variant='standard'
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <MedicalServices
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                autoFocus
                margin='dense'
                id='unitType'
                label='Unit Type'
                type='text'
                fullWidth
                variant='standard'
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin='dense'
                id='company'
                label='Company'
                type='text'
                fullWidth
                variant='standard'
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin='dense'
                id='effect'
                label='Effect'
                type='text'
                fullWidth
                variant='standard'
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color='error' onClick={handleClose}>
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
  { field: "category", headerName: "Category", width: 200, editable: true },
  { field: "unit", headerName: "Unit", type: "number", editable: true },
  { field: "unitType", headerName: "Unit Type", type: 200, editable: true },
  {
    field: "company",
    headerName: "Company",
    type: "text",
    width: 180,
    editable: true,
  },
  {
    field: "effect",
    headerName: "Effect",
    type: "text",
    width: 220,
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    width: 150,
    getActions: () => [
      <GridActionsCellItem icon={<EditIcon />} label='Edit' />,
      <GridActionsCellItem icon={<DeleteIcon />} label='Delete' />,
      <GridActionsCellItem icon={<RestartAlt />} label='Reset Password' />,
    ],
  },
];

const rows = [
  {
    id: 1,
    name: randomTraderName(),
    email: randomEmail(),
    age: 25,
    post: "Doctor",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    email: randomEmail(),
    age: 36,
    post: "Doctor",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    email: randomEmail(),
    age: 19,
    post: "Doctor",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    email: randomEmail(),
    age: 28,
    post: "Nurse",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    email: randomEmail(),
    age: 23,
    post: "Pharamacy",
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];
