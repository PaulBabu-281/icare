import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import toast from "../../components/snackbar";

const dataArr = [
  {
    heading: "Number of patient",
    count: "25",
  },
  {
    heading: "Number of Doctor",
    count: "25",
  },
];
const card = (data) => {
  const [count, setCount] = React.useState({
    doctors: 0,
    patients: 0,
  });
  //const [patient, setPatient] = React.useState(0);
  const fetchCount = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/dash/count",
      //responseType: "stream",
    })
      .then(function (response) {
        //   setCount({ ...count, doctors: response.data.doctors });
        // setDoctors(response.data.doctors);
        console.log("data", response.data.doctors);
        let dcount = response.data.doctors;
        console.log(typeof dcount);
        setCount((count) => ({ ...count.doctors, doctors: dcount }));
        setCount({ ...count, patients: response.data.patients });
        console.log(count);

        // setloading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  React.useLayoutEffect(() => {
    fetchCount();
    //  console.log("hellp");
    // dispatch(getToken());
  }, []);

  return (
    <Grid container sx={{ margin: 2, width: 300 }}>
      <React.Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {data.heading} :
            <Typography variant="body2">{data.count}</Typography>
          </Typography>
        </CardContent>
      </React.Fragment>
    </Grid>
  );
};

function DashboardView() {
  return (
    <Grid container direction="column">
      Today
      <Grid
        container
        direction="row"
        spacing={2}
        //justifyContent="space-evenly"
        alignItems="flex-start"
      >
        {dataArr.map((items) => (
          <Grid item>
            {" "}
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">{card(items)}</Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
export default DashboardView;
