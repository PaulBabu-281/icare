import * as React from "react";

import toast from "../../components/snackbar";

import {
  DataGrid,
  // GridApi,
  // GridCellValue,
  GridToolbar,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";

// import {
//   GridActionsCellItem,
//   GRID_CHECKBOX_SELECTION_COL_DEF,
// } from "@mui/x-data-grid-pro";
import { Grid } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSelected } from "../../redux/tokenSelectSlice";
import { getToken } from "../../redux/tokenSlice";
import axios from "axios";

export default function medicineView() {
  const [isloading, setloading] = React.useState(false);
  const tokenSelected = useSelector((state) => state.selectedToken.value);

  const medecine = useSelector((state) => state.token.value[tokenSelected]);
  console.log(medecine);
  // const LOCAL_STORAGE_KEY_TOKEN_LIST = "token_list";
  // const [patientListSave, savePatientList] = React.useState([]);

  let navigate = useNavigate();

  const navigateToTokenDetails = () => {
    navigate("/pharmacy/Prescriptions/", { replace: true });
  };

  //const [patients, setPatientList] = React.useState([]);
  // console.log(patients);

  const dispatch = useDispatch();
  // function to handel cell edit
  const handleCommit = (e) => {
    console.log(e);
  };

  // api to fetchtoken

  const token = useSelector((state) => state.selectedToken);
  //console.log(token);

  const columns = [
    // {
    //   field: "token_no",
    //   headerName: "Token Number",
    //   width: 110,
    //   type: "number",
    //   // valueGetter: (params) => {
    //   //   // console.log(params.row.patient_health[0].token_no);
    //   //   let result = [];
    //   //   result.push(params.row.patient_health.token_no);
    //   //   return result;
    //   // },
    //   editable: false,
    // },
    { field: "slno", headerName: "Sl No", width: 175, editable: false },
    {
      field: "drug_name",
      headerName: "Drug",

      editable: false,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 200,
      // valueGetter: (params) => {
      //   // console.log(params.row.patient_health[0].temperature);
      //   let result = [];
      //   result.push(params.row.patient_health.temperature);
      //   return result;
      // },

      //type: 200,
      editable: false,
    },
    {
      field: "duration",
      headerName: "Duration",
      width: 200,
      editable: false,
    },
    {
      field: "time",
      headerName: "Instructions",
      width: 200,
      // valueGetter: (params) => {
      //   // console.log(params.row.patient_health[0].temperature);
      //   let result = [];
      //   result.push(params.row.patient_health.temperature);
      //   return result;
      // },

      //type: 200,
      editable: false,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 200,
      // valueGetter: (params) => {
      //   // console.log(params.row.patient_health[0].temperature);
      //   let result = [];
      //   result.push(params.row.patient_health.temperature);
      //   return result;
      // },

      //type: 200,
      editable: false,
    },
  ];

  const submitHandler = () => {
    setloading(true);
    // changeTokenState();
    const instance = axios.create({
      baseURL: "https://deploy-test-idoc.herokuapp.com",
    });

    instance
      .post("/pharmacy/statuschange", {
        _id: medecine._id,
        // patient_id: patients.patient_id,
        // patient_name: patients.patient_name,
        // patient_age: patients.patient_age,
        // medicines: prescriptionState,
        // final_diagnosis: finalDiganosis,
        // token_no: patients.token_no,
        // doctor_name: Doctor,
      })
      .then((response) => {
        toast.success("Saved");
        console.log(response);
        navigateToTokenDetails();
        //  navigateToToken();

        // snackbar("saved", "success");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong!");
      });
    setloading(false);
  };

  return (
    <Grid container direction="column" alignItems={"center"}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          //   row.dataset.id
          onCellEditCommit={handleCommit}
          //   components={{ Toolbar: GridToolbar }}
          rows={medecine.medicines}
          columns={columns}
          getRowId={(row) => row._id}
          loading={isloading}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            console.log(selectedIDs);
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
      <Button onClick={submitHandler} variant="contained">
        Done
      </Button>
    </Grid>
  );
}
