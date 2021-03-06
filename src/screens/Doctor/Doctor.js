import * as React from "react";
import {
  // BrowserRouter,
  useNavigate,
  Route,
  // Router,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
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
  Logout,
  Vaccines,
  LocalHospital,
  Science,
  ConfirmationNumber,
} from "@mui/icons-material";
import DashboardView from "./cardItemView";
import UserManagement from "./userManagement";
import Operations from "./Operations";
import PatientDiagnosis from "./PatientDiagnosis";
import TokenView from "./token";
import { Button } from "@mui/material";
import Lab from "./lab";
import { useSelector } from "react-redux";
import { getToken } from "../../redux/tokenSlice";
import axios from "axios";
import toast from "../../components/snackbar";
//import { Switch } from "@mui/material";

const drawerWidth = 240;

export default function Doctor(props) {
  const name = useSelector((state) => state.user.user_name);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let location = useLocation();
  const fetchToken = async () => {
    await axios({
      method: "get",
      url: "https://deploy-test-idoc.herokuapp.com/patient",
      //responseType: "stream",
    })
      .then(function (response) {
        // console.log("data", response.data.Patient);
        // setPatientList(response.data.Patient[count]);

        dispatch(getToken(response.data.Patient));
        //return response.data.data;
        // setloading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  React.useLayoutEffect(() => {
    fetchToken();
    //  console.log("hellp");
    // dispatch(getToken());
  }, []);

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
  const [appbarText, setText] = React.useState("Welcome");

  const menuItems = [
    //["Dashboard", "User Management", "Stocks", "Drafts"
    {
      text: "Dashboard",
      icon: <Dashboard sx={iconTheme} />,
      path: "doctor/dashboard",
    },
    {
      text: "Patients",
      icon: <Vaccines sx={iconTheme} />,
      path: "doctor/usermanagement",
    },
    {
      text: "Operations",
      icon: <LocalHospital sx={iconTheme} />,
      path: "doctor/operations",
    },
    {
      text: "Lab Result",
      icon: <Science sx={iconTheme} />,
      path: "doctor/lab",
    },
    {
      text: "Token",
      icon: <ConfirmationNumber sx={iconTheme} />,
      path: "/doctor/tokenview",
    },
  ];

  // const ProfileHeader = () => {
  //   return <div>Hello</div>;
  // };

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
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
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
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {location.pathname == "/" ? (
          <Navigate to="doctor/dashboard" state={{ from: location }} replace />
        ) : (
          ""
        )}
        <Toolbar />
        {/* <Router>
          <Routes>
            <Route path='/' exact element={<DashboardView />} />
            <Route path='/usermanagement' element={<UserManagement />} />
          </Routes>
        </Router> */}

        <Routes>
          <Route path="doctor/dashboard" element={<DashboardView />} />
          <Route path="doctor/usermanagement" element={<UserManagement />} />
          <Route path="doctor/operations" element={<Operations />} />
          <Route path="doctor/tokenview" element={<TokenView />} />
          <Route path="doctor/lab" element={<Lab />} />
          <Route
            path="doctor/patientdiagnosis"
            element={<PatientDiagnosis />}
          />
        </Routes>
      </Box>
    </Box>
  );
}
