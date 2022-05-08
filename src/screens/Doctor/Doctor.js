import * as React from "react";
import {
  // BrowserRouter,
  useNavigate,
  Route,
  // Router,
  Routes,
  useLocation,
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
  Logout,
  Vaccines,
  LocalHospital,
  Science,
} from "@mui/icons-material";
import DashboardView from "./cardItemView";
import UserManagement from "./userManagement";
import Operations from "./Operations";
//import { Switch } from "@mui/material";

const drawerWidth = 240;

export default function Doctor(props) {
  let navigate = useNavigate();
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
      path: "/",
    },
  ];

  // const ProfileHeader = () => {
  //   return <div>Hello</div>;
  // };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: "#4c51c6",
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {appbarText}
          </Typography>
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
        variant='permanent'
        anchor='left'
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
              <ListItemText primary='Doctor' />
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

        <List sx={{ paddingRight: 2, paddingTop: 40 }}>
          <ListItem
            button
            key={"Logout"}
            sx={{
              maxWidth: 360,
              marginLeft: 1,
              marginTop: 1,
              borderRadius: 2,
              borderWidth: 1,

              "&:hover": {
                background: "#fd830d",
              },
            }}
            onClick={LogoutHandler}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {console.log(useLocation())}
        <Toolbar />
        {/* <Router>
          <Routes>
            <Route path='/' exact element={<DashboardView />} />
            <Route path='/usermanagement' element={<UserManagement />} />
          </Routes>
        </Router> */}

        <Routes>
          <Route path='doctor/dashboard' element={<DashboardView />} />
          <Route path='doctor/usermanagement' element={<UserManagement />} />
          <Route path='doctor/operations' element={<Operations />} />
        </Routes>
      </Box>
    </Box>
  );
}
