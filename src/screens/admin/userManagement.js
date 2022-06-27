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

// icons
import {
  AccountCircle,
  Add,
  Email,
  MedicalServices,
  Password,
  SentimentVerySatisfied,
  Fingerprint,
  RememberMe,
  Delete,
} from "@mui/icons-material";

//axios import
import axios from "axios";

//snackbar

// https://github.com/iamhosseindhv/notistack/issues/30
import toast from "../../components/snackbar";

// transition effect
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserManagement() {
  // input Dialog

  const [open, setOpen] = React.useState(false);
  const [isloading, setloading] = React.useState(true);
  const [rows, setRow] = React.useState([]);

  const fetchUsers = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/user",
      //responseType: "stream",
    })
      .then(function (response) {
        console.log(response);
        setRow(response.data.users);
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
    fetchUsers();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // function errorVal(error) {
  //   console.log("Invalid success: ", error);
  //   snackbar("saved", "success");
  //   // return Promise.reject('Invalid!');
  // }
  const SubmitHandler = () => {
    setOpen(false);
    //console.log(userInfo);
    const instance = axios.create({
      baseURL: "https://deploy-test-idoc.herokuapp.com",
    });

    instance
      .post("/signup", {
        user_name: userInfo.user_name,
        user_mail: userInfo.user_mail,
        user_id: userInfo.user_id,
        finger_id: userInfo.finger_id,
        user_role: userInfo.user_role,
        user_number: userInfo.user_number,
        user_address: userInfo.user_address,
      })
      .then((response) => {
        toast.success("Saved");
        console.log(response);
        // snackbar("saved", "success");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong!");
      });
  };

  const handleClose = () => {
    setOpen(false);
    toast.error("Action Canceled");
  };

  //snackbar 2

  // const { enqueueSnackbar } = useSnackbar();
  // const snackbar = (message, variant) => () => {
  //   console.log(message, variant);
  //   // variant could be success, error, warning, info, or default
  //   enqueueSnackbar(message, { variant });
  // };

  const [userInfo, addUserinfo] = React.useState({
    user_name: "",
    user_mail: "",
    user_id: "",
    finger_id: "",
    user_role: "",
    user_number: "",
    user_address: "",
  });

  // Dialog Menu
  const DialogAddMenu = () => {
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill Fields</DialogContentText>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              autoFocus
              onChange={(e) =>
                addUserinfo({ ...userInfo, user_name: e.target.value })
              }
              value={userInfo.user_name}
              margin="dense"
              id="user_name"
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
              onChange={(e) =>
                addUserinfo({ ...userInfo, user_mail: e.target.value })
              }
              value={userInfo.user_mail}
              margin="dense"
              id="user_mail"
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
              onChange={(e) =>
                addUserinfo({ ...userInfo, user_id: e.target.value })
              }
              value={userInfo.user_id}
              autoFocus
              margin="dense"
              id="user_id"
              label="UserID"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Fingerprint sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              autoFocus
              onChange={(e) =>
                addUserinfo({ ...userInfo, finger_id: e.target.value })
              }
              value={userInfo.finger_id}
              margin="dense"
              id="finger_id"
              label="Finger_id"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <MedicalServices sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              autoFocus
              onChange={(e) =>
                addUserinfo({ ...userInfo, user_role: e.target.value })
              }
              value={userInfo.user_role}
              margin="dense"
              id="user_role"
              label="Role"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <RememberMe sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              autoFocus
              onChange={(e) =>
                addUserinfo({ ...userInfo, user_number: e.target.value })
              }
              value={userInfo.user_number}
              margin="dense"
              id="user_number"
              label="Number"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              autoFocus
              onChange={(e) =>
                addUserinfo({ ...userInfo, user_address: e.target.value })
              }
              value={userInfo.user_address}
              margin="dense"
              id="user_address"
              label="Address"
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
          <Button type="submit" onClick={SubmitHandler}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // end of input dialog

  return (
    <Grid container direction="column" alignItems={"center"}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isloading}
          getRowId={(row) => row._id}
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
        {/* dialog box  */}
        {DialogAddMenu()}
      </Grid>
    </Grid>
  );
}

const columns = [
  { field: "user_name", headerName: "Name", width: 160, editable: true },
  { field: "user_mail", headerName: "Email", width: 200, editable: true },
  { field: "user_role", headerName: "Position", type: 200, editable: true },
  {
    field: "user_number",
    headerName: "Phone Number",
    width: 180,
    editable: true,
  },
  {
    field: "user_address",
    headerName: "Address",
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
