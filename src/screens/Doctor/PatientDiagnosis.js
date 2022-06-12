import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
import { updatePrepList } from "../../redux/prescrptionSlice";
import { initializeState } from "../../redux/tokenSlice";

import "./doctor.css";
import { styled } from "@mui/material/styles";

const vertLine = () => {
  return <Divider color="black" variant="middle" orientation="vertical" />;
};

export default function PatientDiagnosis() {
  //State from redux store
  const patients = useSelector((state) => state.token);
  const tokenSelected = useSelector((state) => state.selectedToken);
  const Doctor = useSelector((state) => state.user);
  const prescriptionState = useSelector((state) => state.savePrescrption);

  const dispatch = useDispatch();

  // console.log( "in daiagno");
  //console.log(tokenSelected.value);
  const [count, setCount] = useState(tokenSelected.value - 1 || 0);
  const [prepcount, setPrepCount] = useState(Number(-1));
  //setCount(tokenSelected.value);
  const nextToken = () => {
    setCount(count + 1);
  };
  const lastToken = () => {
    setCount(count - 1);
  };

  const [prescription, addPrescription] = React.useState({
    Drug: "",
    freq: "",
    duration: "",
    inst: "",
    remaks: "",
    id: 0,
  });
  const [prescriptionReal, addPrescriptionReal] = React.useState([
    {
      Drug: "",
      freq: "",
      duration: "",
      inst: "",
      remaks: "",
      id: "",
    },
  ]);

  const SubmitHandler = (e) => {
    dispatch(
      initializeState({
        id: 4,
        name: "Go Back",
        tokenNo: 4,
        age: 22,
        weight: 75,
        temperature: 35,
        BPM: 77,
        gender: "F",
      })
    );
    let num = prepcount;
    num = num + 1;

    addPrescription({ ...prescription, id: num });
    //e.preventDefault();

    setPrepCount(prepcount + 1);
    let newPrep = [...prescriptionReal];
    newPrep.push(prescription);
    addPrescriptionReal(newPrep);

    dispatch(updatePrepList(prescription));
    console.log(prescriptionState);
  };

  const box = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "fit-content",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.secondary",
          "& svg": {
            m: 1.5,
          },
          "& hr": {
            mx: 0.5,
          },
        }}
      ></Box>
    );
  };

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  return (
    <Box sx={{ width: "100%", height: "100%", marginTop: 5 }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
              if (count > 0) lastToken();
            }}
          >
            Back
          </Button>

          <Typography>Patient Name : {patients[count].name}</Typography>
          {/* </Box> */}

          <Divider variant="middle" orientation="vertical" />

          <Typography>Token Number : {patients[count].tokenNo}</Typography>

          <Button
            sx={{ margin: 2 }}
            variant="outlined"
            startIcon={<ArrowForward />}
            onClick={() => {
              if (count < patients.length - 1) nextToken();
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
          <Typography> Age: {patients[count].age}</Typography>
          <Divider variant="middle" orientation="vertical" />
          <Typography>Weight : {patients[count].weight}</Typography>
          <Divider variant="middle" orientation="vertical" />
          <Typography>
            Body Temperature : {patients[count].temperature}
          </Typography>
          <Divider variant="middle" orientation="vertical" />
          <Typography>BPM : {patients[count].BPM}</Typography>{" "}
        </Grid>
        <Divider variant="middle" />
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          margin={4}
        >
          <Typography> Gender: {patients[count].gender}</Typography>
          <Divider variant="middle" orientation="vertical" />
          <Typography>Doctor : Dr.{Doctor[1].name}</Typography>

          <TextField
            sx={{ width: 250 }}
            id="outlined-multiline-flexible"
            label="Final diagnosis"
            multiline
            rows={2}
            // style={{ width: "100 %" }}
            //defaultValue="Default Value"
            //variant="filled"
          />

          <TextField
            sx={{ width: 250 }}
            id="outlined-multiline-flexible"
            label="Lab test "
            multiline
            rows={2}
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
          margin={4}
          marginLeft={10}
          marginRight={10}
        >
          <Autocomplete
            Key={prescription.Drug}
            clearOnEscape
            onInputChange={(e, value) =>
              addPrescription({
                ...prescription,
                Drug: value,
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
              addPrescription({ ...prescription, freq: value })
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
            renderInput={(params) => <TextField {...params} label="Duration" />}
          />
          <Autocomplete
            disablePortal
            onInputChange={(e, value) =>
              addPrescription({ ...prescription, inst: value })
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
            // style={{ width: "100 %" }}
            //defaultValue="Default Value"
            //variant="filled"
          />
          <Button onClick={SubmitHandler} variant="contained">
            Add
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
          <div style={{ height: 300, width: "110%" }}>
            <DataGrid
              rows={prescriptionState}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
