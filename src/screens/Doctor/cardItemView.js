import { Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
const card = (data) => {
  return (
    <Grid container sx={{ margin: 2, width: 300 }}>
      <React.Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
            {data.heading} :
            <Typography variant="body2">{data.count}</Typography>
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </React.Fragment>
    </Grid>
  );
};

// export default function OutlinedCard() {
//   return (
//     <Box sx={{ minWidth: 275 }}>
//       <Card variant="outlined">{card}</Card>
//     </Box>
//   );
// }

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
      This Week
      <Grid item>Graph Here (Coming soon...)</Grid>
    </Grid>
  );
}
export default DashboardView;
