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
  Business,
  Grain,
  CalendarMonth,
  Category,
  DriveFileRenameOutline,
  Numbers,
  Looks6,
} from "@mui/icons-material";

import toast from "../../components/snackbar";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Stocks() {
  // input Dialog

  const [open, setOpen] = React.useState(false);
  const [rows, setRow] = React.useState([]);
  const [isloading, setloading] = React.useState(true);
  const [newStock, addNewStock] = React.useState({
    stock_name: "",
    stock_category: "",
    stock_units: "",
    stock_type: "",
    company_name: "",
    effect: "",
    expiry_date: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const addStock = async () => {
    const instance = axios.create({
      baseURL: "https://deploy-test-idoc.herokuapp.com",
    });
    //deploy-test-idoc.herokuapp.com/stocks/add
    console.log(newStock);
    await instance
      .post("/stocks/add", {
        stock_name: newStock.stock_name,
        stock_category: newStock.stock_category,
        stock_unit: newStock.stock_units,
        stock_type: newStock.stock_type,
        company_name: newStock.company_name,
        effect: newStock.effect,
        expiry_date: newStock.expiry_date,
      })
      .then((response) => {
        console.log(response);
        toast.success("Data Added");
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error("something went wrong!");
      });
  };
  const handleSave = async () => {
    console.log();
    await addStock();
    fetchStock();
    setOpen(false);
    // toast.error("something went wrong!");
  };

  const handleClose = () => {
    setOpen(false);

    toast.error("Operation cancelled");
  };
  // input dialog
  const fetchStock = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/stocks",
      //responseType: "stream",
    })
      .then(function (response) {
        console.log(response.data.stocks);
        setRow(response.data.stocks);
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
    fetchStock();
  }, []);

  return (
    <Grid container direction="column" alignItems={"center"}>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={rows}
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
          <DialogTitle>Add Stock</DialogTitle>
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
              <DriveFileRenameOutline
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="stock_name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  addNewStock({ ...newStock, stock_name: e.target.value })
                }
                value={newStock.stock_name}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Category sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="stock_category"
                label="Category"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  addNewStock({
                    ...newStock,
                    stock_category: e.target.value,
                  })
                }
                value={newStock.stock_category}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Numbers sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="stock_units"
                label="Units"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  addNewStock({
                    ...newStock,
                    stock_units: e.target.value,
                  })
                }
                value={newStock.stock_units}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Looks6 sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="stock_type"
                label="Unit Type"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  addNewStock({
                    ...newStock,
                    stock_type: e.target.value,
                  })
                }
                value={newStock.stock_type}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Business sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="company_name"
                label="Company"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  addNewStock({
                    ...newStock,
                    company_name: e.target.value,
                  })
                }
                value={newStock.company_name}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <Grain sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="effect"
                label="Effect"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  addNewStock({
                    ...newStock,
                    effect: e.target.value,
                  })
                }
                value={newStock.effect}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <CalendarMonth sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                autoFocus
                margin="dense"
                id="expiry_date"
                label="Expiry Date"
                type="date"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  addNewStock({
                    ...newStock,
                    expiry_date: e.target.value,
                  })
                }
                value={newStock.expiry_date}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
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
  { field: "stock_name", headerName: "Name", width: 160, editable: true },
  {
    field: "stock_category",
    headerName: "Category",
    width: 200,
    editable: true,
  },
  { field: "stock_unit", headerName: "Unit", type: "number", editable: true },
  { field: "stock_type", headerName: "Unit Type", type: 200, editable: true },
  {
    field: "company_name",
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
