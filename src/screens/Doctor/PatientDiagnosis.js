import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { afterBefore, Drug, Duration, Freq, columns } from "./data";
import { updatePrepList } from "../../redux/prescrptionSlice";

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
    let num = prepcount;
    num = num + 1;

    addPrescription({ ...prescription, id: num });
    //e.preventDefault();

    setPrepCount(prepcount + 1);
    let newPrep = [...prescriptionReal];
    newPrep.push(prescription);
    addPrescriptionReal(newPrep);
    // console.log("input prep");
    // console.log(prescription);
    // console.log("temp prep ");
    // console.log(newPrep);
    // console.log(prepcount);
    // console.log(prescriptionReal);
    dispatch(updatePrepList(prescription));
    // console.log("From Store");
    console.log(prescriptionState);

    // LoginDetail(details);
  };

  // const prescription = [
  //   {
  //     id: 1,
  //     num: 1,
  //     Drug: "Cocaine",
  //     freq: "Twice a day",
  //     duration: "4 days",
  //     inst: "after food",
  //     remaks: "none",
  //   },
  // ];

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
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          margin={3}
        >
          <Typography> Age: {patients[count].age}</Typography>
          <Typography>Weight : {patients[count].weight}</Typography>
          <Typography>
            Body Temperature : {patients[count].temperature}
          </Typography>
          <Typography>BPM : {patients[count].BPM}</Typography>{" "}
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          margin={4}
        >
          <Typography> Gender: {patients[count].gender}</Typography>
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
