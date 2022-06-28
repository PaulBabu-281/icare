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

export default function TokenView() {
  const [isloading, setloading] = React.useState(true);

  // const LOCAL_STORAGE_KEY_TOKEN_LIST = "token_list";
  // const [patientListSave, savePatientList] = React.useState([]);

  let navigate = useNavigate();

  const navigateToTokenDetails = () => {
    navigate("/doctor/patientdiagnosis/", { replace: true });
  };

  const [patients, setPatientList] = React.useState([]);
  // console.log(patients);

  const dispatch = useDispatch();
  // function to handel cell edit
  const handleCommit = (e) => {
    console.log(e);
  };

  // api to fetchtoken
  const fetchToken = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/patient",
      //responseType: "stream",
    })
      .then(function (response) {
        // console.log(response.data.Patient);
        setPatientList(response.data.Patient);
        dispatch(getToken(response.data.Patient));
        // localStorage.setItem(
        //   LOCAL_STORAGE_KEY_TOKEN_LIST,
        //   response.data.Patient
        // );
        //return response.data.data;
        setloading(false);
        // const userLocalSaveUserName = localStorage.getItem(
        //   LOCAL_STORAGE_KEY_TOKEN_LIST
        // );
        // console.log(userLocalSaveUserName);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  React.useEffect(() => {
    fetchToken();
    // dispatch(getToken());
  }, []);

  const token = useSelector((state) => state.selectedToken);
  //console.log(token);

  const columns = [
    {
      field: "token_no",
      headerName: "Token Number",
      width: 110,
      type: "number",
      // valueGetter: (params) => {
      //   // console.log(params.row.patient_health[0].token_no);
      //   let result = [];
      //   result.push(params.row.patient_health.token_no);
      //   return result;
      // },
      editable: false,
    },
    { field: "patient_name", headerName: "Name", width: 175, editable: false },
    {
      field: "patient_age",
      headerName: "Age",
      type: "number",
      editable: false,
    },
    {
      field: "temperature",
      headerName: "Body temperature",
      type: "number",
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
      field: "pulse_rate",
      headerName: "Pulse rate",
      type: "number",
      width: 150,
      // valueGetter: (params) => {
      //   // console.log(params.row.patient_health[0].temperature);
      //   let result = [];
      //   result.push(params.row.patient_health.pulse_rate);
      //   return result;
      // },
      editable: false,
    },
    {
      field: "oxygen_rate",
      headerName: "oxygen",
      type: "number",
      // valueGetter: (params) => {
      //   // console.log(params.row.patient_health[0].temperature);
      //   let result = [];
      //   result.push(params.row.patient_health.oxygen_rate);
      //   return result;
      // },
      width: 150,
      editable: false,
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

          //generatePath("/users/:id", { id: 42 });
          // console.log(params.row);
          let index = patients.findIndex(
            (patients) => patients.token_no === params.row.token_no
          );
          //  console.log(index);
          dispatch(updateSelected(index));

          navigateToTokenDetails();
        };

        return <Button onClick={onClick}>{<Visibility />}</Button>;
      },
    },
  ];

  return (
    <Grid container direction="column" alignItems={"center"}>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          //   row.dataset.id
          onCellEditCommit={handleCommit}
          components={{ Toolbar: GridToolbar }}
          rows={patients}
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
    </Grid>
  );
}
