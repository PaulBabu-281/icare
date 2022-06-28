import React, { useEffect, useLayoutEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";

export default function PatientDetailView({ patients }) {
  return (
    <Box>
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
          // onClick={() => {
          //   if (count > 0) lastToken();
          // }}
        >
          Back
        </Button>

        <Typography>Patient Name : {patients.patient_name}</Typography>
        {/* </Box> */}

        <Divider variant="middle" orientation="vertical" />

        {/* <Typography>
            Token Number : {patients.patient_health.token_no}
          </Typography> */}

        <Button
          sx={{ margin: 2 }}
          variant="outlined"
          startIcon={<ArrowForward />}
          // onClick={() => {
          //   if (count < patients.length - 1) nextToken();
          // }}
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
        <h1>
          Body Temperature :{" "}
          {/* {patients && patients.patient_health.temperature
              ? 
              : "Not loaded yet"}{" "} */}
          {patients.patient_health.temperature}
        </h1>
        <Divider variant="middle" orientation="vertical" />
        {/* <Typography>BPM : {patients.patient_health.pulse_rate}</Typography> */}
      </Grid>
    </Box>
  );
}
