import * as React from "react";

import {
  // BrowserRouter,
  useNavigate,
  Outlet,

  // Router,
  Routes,
  Route,
  useLocation,
  matchRoutes,
  Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import {
  AccountCircle,
  Dashboard,
  Badge,
  Inventory,
  Biotech,
  Logout,
  Description,
} from "@mui/icons-material";
// import UserManagement from "./userManagement";
// import TokenView from "../Doctor/token";
// import Stocks from "./stocks";
import CardView from "./overview";
// import Lab from "./lab";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import Stocks from "./stocks";
import PrescriptionView from "./prepscription";
import MedicineViewPage from "./medicneView";
import { Button } from "@mui/material";
import { getToken } from "../../redux/tokenSlice";
import axios from "axios";
import toast from "../../components/snackbar";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

export default function PharmacyDashboard(props) {
  const name = useSelector((state) => state.user.user_name);
  const [doctor, setDoctors] = React.useState(0);
  const [patient, setPatient] = React.useState(0);
  //console.log("name from redux " + name);
  let navigate = useNavigate();
  let location = useLocation();
  let dispatch = useDispatch();

  const LogoutHandler = (e) => {
    e.preventDefault();
    props.LogoutFunc();
  };
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    paper: {
      background: "#4c51c6",
    },
  });

  const classes = useStyles();

  const iconTheme = {
    color: "#e9f4ff",
  };

  const fetchToken = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/pharmacy/view",
      //responseType: "stream",
    })
      .then(function (response) {
        // console.log("data", response.data.Patient);
        // setPatientList(response.data.Patient[count]);
        //console.log(response.data.prescripDetails);
        dispatch(getToken(response.data.prescripDetails));
        //return response.data.data;
        // setloading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  const fetchCount = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/dash/count",
      //responseType: "stream",
    })
      .then(function (response) {
        //   setCount({ ...count, doctors: response.data.doctors });
        setDoctors(response.data.doctors);
        console.log("data", response.data.doctors);

        // setloading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  React.useLayoutEffect(() => {
    fetchToken();
    fetchCount();
    //  console.log("hellp");
    // dispatch(getToken());
  }, []);

  const [appbarText, setText] = React.useState("Welcome");
  //console.log("name from redux " + name);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard sx={iconTheme} />,
      path: "/pharmacy/overview",
    },
    {
      text: "Stock",
      icon: <Inventory sx={iconTheme} />,
      path: "/pharmacy/stocks",
    },
    {
      text: "Prescriptions",
      icon: <Description sx={iconTheme} />,
      path: "/pharmacy/Prescriptions",
    },
    // {
    //   text: "Lab",
    //   icon: <Biotech sx={iconTheme} />,
    //   path: "/admin/lab",
    // },
  ];

  //const routes = [{ path: "/" }];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#4c51c6",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {appbarText}
          </Typography>
          <Button
            onClick={LogoutHandler}
            color="inherit"
            startIcon={<Logout />}
            sx={{
              "&:hover": {
                background: "#fd830d",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#4c51c6",
            color: "#e9f4ff",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.paper }}
      >
        <Toolbar style={{ height: "15%" }}>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            <ListItem
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(menuItems[0].path);
                setText(menuItems[0].text);
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle
                  // style={{ cursor: "pointer" }}
                  // onClick={() => {
                  //   navigate(menuItems[0].path);
                  // }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Pharmacy" />
            </ListItem>
          </List>
        </Toolbar>
        <Divider />

        <List sx={{ paddingRight: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              sx={{
                maxWidth: 360,
                // marginRight: 1,
                marginLeft: 1,
                marginTop: 1,
                //paddingRight: 10,
                // paddingBottom: 20,
                borderRadius: 2,
                borderWidth: 1,

                "&:hover": {
                  background: "#fd830d",
                },
              }}
              onClick={() => {
                setText(item.text);

                navigate(item.path);
              }}

              //onMouseEnter={this.handleMouseEnter}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        // className='main-content'
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "Background.default",
          p: 3,
        }}
      >
        <Toolbar />
        <Box className="main-content">
          {location.pathname == "/" ? (
            <Navigate
              to="/pharmacy/overview"
              state={{ from: location }}
              replace
            />
          ) : (
            ""
          )}
        </Box>
        <SnackbarProvider maxSnack={3}>
          <Routes>
            <Route index path="/pharmacy/overview" element={<CardView />} />
            <Route path="/pharmacy/stocks" element={<Stocks />} />
            <Route
              path="/pharmacy/Prescriptions"
              element={<PrescriptionView />}
            />
            <Route
              path="/pharmacy/Prescriptions/view"
              element={<MedicineViewPage />}
            />
          </Routes>
        </SnackbarProvider>
      </Box>
      <Outlet />
    </Box>
  );
}
