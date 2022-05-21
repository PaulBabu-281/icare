import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function PatientDiagnosis() {
  const patients = useSelector((state) => state.token);
  // console.log(patients);
  const [count, setCount] = useState(0);
  const nextToken = () => {
    setCount(count + 1);
  };
  const lastToken = () => {
    setCount(count - 1);
  };

  // const patients = [
  //   {
  //     name: "Raju Bhai",
  //     tokenNo: 1,
  //     age: 35,
  //     weight: 75,
  //     temperature: 45,
  //     BPM: 77,
  //   },
  //   {
  //     name: "Rocky Bhai",
  //     tokenNo: 2,
  //     age: 28,
  //     weight: 75,
  //     temperature: 45,
  //     BPM: 77,
  //   },
  //   {
  //     name: "Megatron",
  //     tokenNo: 3,
  //     age: 22,
  //     weight: 75,
  //     temperature: 35,
  //     BPM: 77,
  //   },
  //   {
  //     name: "Go Back",
  //     tokenNo: 3,
  //     age: 22,
  //     weight: 75,
  //     temperature: 35,
  //     BPM: 77,
  //   },
  // ];
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid
          container
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
        >
          <Button
            sx={{ margin: 2 }}
            variant='outlined'
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
            variant='outlined'
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
          direction='row'
          justifyContent='space-evenly'
          alignItems='center'
        >
          <Typography> Age: {patients[count].age}</Typography>
          <Typography>Weight : {patients[count].weight}</Typography>
          <Typography>
            Body Temperature : {patients[count].temperature}
          </Typography>
          <Typography>BPM : {patients[count].BPM}</Typography>{" "}
        </Grid>
        <Grid item xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
