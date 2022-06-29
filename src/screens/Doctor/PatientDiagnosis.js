import React, { useEffect, useLayoutEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { afterBefore, Drug, Duration, Freq, columns } from "./data";
import {
  removePrescription,
  updatePrepList,
} from "../../redux/prescrptionSlice";
import { initializeState } from "../../redux/tokenSlice";

import "./doctor.css";
import { styled } from "@mui/material/styles";
import axios from "axios";
import toast from "../../components/snackbar";
import PatientDetailView from "./patientDetails";
import { updateSelected } from "../../redux/tokenSelectSlice";
import CustomizedProgressBars from "../../components/circularProgress";

let number = 0;

const vertLine = () => {
  return <Divider color="black" variant="middle" orientation="vertical" />;
};

const slNo = () => {
  number++;
  return number;
};

export default function PatientDiagnosis() {
  //State from redux store
  const tokenSelected = useSelector((state) => state.selectedToken.value);
  //  console.log(tokenSelected);
  const patients = useSelector((state) => state.token.value[tokenSelected]);

  const patientList = useSelector((state) => state.token.value);
  //console.log(patients);

  const Doctor = useSelector((state) => state.user.user_name);
  const prescriptionState = useSelector((state) => state.savePrescrption);

  const [stocks, setStocks] = React.useState();
  const [loadStock, setStockLoad] = React.useState(true);
  const [isloading, setloading] = React.useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const navigateToToken = () => {
    navigate("/doctor/tokenview", { replace: true });
  };
  const fetchStock = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/stocks/medecine",
      //responseType: "stream",
    })
      .then(function (response) {
        console.log(response.data);
        // {
        //   const newNames = response.data.map((item) => item);
        //   setStocks([...stocks, ...newNames]);
        // }

        //setStocks((stocks) => [..stocks, ...response.data]);
        setStockLoad(false);
        console.log(stocks);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useLayoutEffect(() => {
    fetchStock();
  }, []);

  const [count, setCount] = useState(tokenSelected || 0);
  const [finalDiganosis, setDiagnosis] = useState("");

  const nextToken = () => {
    setCount(count + 1);
    dispatch(updateSelected(count));
    dispatch(removePrescription([]));
  };
  const lastToken = () => {
    setCount(count - 1);
    dispatch(updateSelected(count));
    dispatch(removePrescription());
    //console.log(count);
  };

  const [prescription, addPrescription] = React.useState({
    drug_name: "",
    frequency: "",
    duration: "",
    time: "",
    remarks: "",
    slno: slNo(),
  });

  const changeTokenState = () => {
    //setloading(true);
    const instance = axios.create({
      baseURL: "https://deploy-test-idoc.herokuapp.com",
    });

    instance
      .post("/patient/tokenchange", {
        _id: patients._id,
      })
      .then((response) => {
        toast.success("Saved");
        console.log(response);
        // navigateToToken();

        // snackbar("saved", "success");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong!");
      });
    //setloading(false);
  };

  const submitHandler = () => {
    setloading(true);
    changeTokenState();
    const instance = axios.create({
      baseURL: "https://deploy-test-idoc.herokuapp.com",
    });

    instance
      .post("doctor/newPrescription", {
        patient_id: patients.patient_id,
        patient_name: patients.patient_name,
        patient_age: patients.patient_age,
        medicines: prescriptionState,
        final_diagnosis: finalDiganosis,
        token_no: patients.token_no,
        doctor_name: Doctor,
      })
      .then((response) => {
        toast.success("Saved");
        console.log(response);
        navigateToToken();

        // snackbar("saved", "success");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong!");
      });
    setloading(false);
  };

  const addHandler = () => {
    addPrescription({ ...prescription, slno: slNo() });
    //e.preventDefault();

    // setPrepCount(prepcount + 1);
    // let newPrep = [...prescriptionReal];
    // newPrep.push(prescription);
    // addPrescriptionReal(newPrep);

    dispatch(updatePrepList(prescription));
    console.log(prescriptionState);
  };

  const box = () => {
    // await patients.patient_health;
    return (
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Button
            sx={{ margin: 2 }}
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => {
              if (count >= 0) lastToken();
            }}
          >
            Back
          </Button>

          <Typography>Patient Name : {patients.patient_name}</Typography>
          {/* </Box> */}

          <Divider variant="middle" orientation="vertical" />

          <Typography>Token Number : {patients.token_no}</Typography>

          <Button
            sx={{ margin: 2 }}
            variant="outlined"
            startIcon={<ArrowForward />}
            onClick={() => {
              if (count <= patientList.length - 1) nextToken();
            }}
          >
            Next
          </Button>
        </Grid>
        <Divider variant="middle" />
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          margin={3}
        >
          <Typography>
            Age:
            {patients.patient_age}
          </Typography>
          <Divider variant="middle" orientation="vertical" />
          {/* <Typography>Weight : {patients[count].weight}</Typography>
          <Divider variant="middle" orientation="vertical" /> */}
          <Typography>Body Temperature : {patients.temperature}</Typography>
          <Divider variant="middle" orientation="vertical" />
          <Typography>BPM : {patients.pulse_rate}</Typography>
        </Grid>
        <Divider variant="middle" />
      </Box>
    );
  };

  // fuction return

  return (
    <div style={{ width: "100%", height: "110" }}>
      {isloading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center",
            zIndex: "1",
            position: "absolute",
            left: "50%",
          }}
        >
          <CustomizedProgressBars sx={{ fontSize: "200px" }} size={100} />
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{ width: "100%", height: "110", marginTop: 5, marginBottom: 20 }}
        style={{ position: "relative" }}
      >
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {patients ? (
            box()
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100vh",
                alignItems: "center",
                zIndex: "1",
                position: "absolute",
                left: "50%",
              }}
            >
              <CustomizedProgressBars sx={{ fontSize: "200px" }} size={100} />
            </Box>
          )}
          <Divider variant="middle" />
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            margin={4}
          >
            {/* <Typography> Gender: {patients[count].gender}</Typography>
          <Divider variant="middle" orientation="vertical" /> */}
            <Typography>Doctor : Dr.{Doctor}</Typography>

            <TextField
              sx={{ width: 250 }}
              id="outlined-multiline-flexible"
              label="Final diagnosis"
              multiline
              rows={2}
              onChange={
                (e, value) => {
                  //console.log("value", e.target.value);
                  setDiagnosis(e.target.value);
                  // console.log(finalDiganosis);
                }
                // console.log(finalDiganosis)
              }

              // style={{ width: "100 %" }}
              //defaultValue="Default Value"
              //variant="filled"
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            margin={2}
            marginLeft={10}
            marginRight={10}
          >
            <Autocomplete
              //Key={stocks.stock_name}
              clearOnEscape
              loading={loadStock}
              onInputChange={(e, value) =>
                addPrescription({
                  ...prescription,
                  drug_name: value,
                })
              }
              key={false}
              id="combo-box-demo"
              options={Drug}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Drug" />}
            />
            <Autocomplete
              disablePortal
              onInputChange={(e, value) =>
                addPrescription({ ...prescription, frequency: value })
              }
              id="combo-box-demo"
              options={Freq}
              sx={{ width: 150 }}
              renderInput={(params) => (
                <TextField {...params} label="Frequency" />
              )}
            />

            <Autocomplete
              disablePortal
              onInputChange={(e, value) =>
                addPrescription({ ...prescription, duration: value })
              }
              id="combo-box-demo"
              options={Duration}
              sx={{ width: 150 }}
              renderInput={(params) => (
                <TextField {...params} label="Duration" />
              )}
            />
            <Autocomplete
              disablePortal
              onInputChange={(e, value) =>
                addPrescription({ ...prescription, time: value })
              }
              id="combo-box-demo"
              options={afterBefore}
              sx={{ width: 200 }}
              renderInput={(params) => (
                <TextField {...params} label="After or Before Food" />
              )}
            />
            <TextField
              sx={{ width: 180 }}
              id="outlined-multiline-flexible"
              label="Remarks "
              multiline
              rows={2}
              onChange={(e, value) =>
                addPrescription({ ...prescription, remarks: e.target.value })
              }
              // style={{ width: "100 %" }}
              //defaultValue="Default Value"
              //variant="filled"
            />
            <Button onClick={addHandler} variant="contained">
              Add
            </Button>
            <Button onClick={submitHandler} variant="contained">
              Submit
            </Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            margin={4}
            marginLeft={10}
            marginRight={10}
          >
            {/* DATA TABLE */}
            <div style={{ height: 500, width: "110%" }}>
              <DataGrid
                rows={prescriptionState}
                columns={columns}
                getRowId={(row) => row.slno}
                pageSize={5}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                // disableSelectionOnClick
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
