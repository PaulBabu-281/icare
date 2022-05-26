import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function PatientDiagnosis() {
  const patients = useSelector((state) => state.token);
  const tokenSelected = useSelector((state) => state.selectedToken);
  const Doctor = useSelector((state) => state.user);

  // console.log( "in daiagno");
  console.log(tokenSelected.value);
  const [count, setCount] = useState(tokenSelected.value - 1 || 0);

  //setCount(tokenSelected.value);
  const nextToken = () => {
    setCount(count + 1);
  };
  const lastToken = () => {
    setCount(count - 1);
  };

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
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Drug" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 150 }}
            renderInput={(params) => (
              <TextField {...params} label="Frequency" />
            )}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 150 }}
            renderInput={(params) => <TextField {...params} label="Duration" />}
          />
          <Autocomplete
            disablePortal
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
          <Button variant="contained">Add</Button>
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
          <div style={{ height: 300, width: "100%" }}>
            <DataGrid
              rows={rows}
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

const afterBefore = [
  { label: "After food" },
  { label: "Before food" },
  { label: "30 min after food" },
  { label: "30 min before food" },
];
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
