import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Graph from "./graphView";

const dataArr = [
  {
    heading: "Number of patient",
    count: "25",
  },
  {
    heading: "Number of Doctor",
    count: "25",
  },
  {
    heading: "Number of casualty",
    count: "25",
  },
];
const card = (data, i) => {
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          {data.heading}
        </Typography>
        <Typography variant="body2" key={i}>
          {data.count}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
};

function DashboardView() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid container direction="column">
        today
        <Grid container direction="row">
          {dataArr.map((items, i) => (
            <Grid item>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card(items, i)}</Card>
              </Box>
            </Grid>
          ))}
        </Grid>
        This Week
        {/* <Grid item>
        <Graph />
      </Grid> */}
      </Grid>
    </div>
  );
}
export default DashboardView;
