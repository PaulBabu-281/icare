import * as React from "react";
import "./component.css";
import {
  // BrowserRouter,
  useNavigate,
  Outlet,

  // Router,
  Routes,
  Route,
  useLocation,
  matchRoutes,
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
  ConfirmationNumber,
} from "@mui/icons-material";
import UserManagement from "./userManagement";
import TokenView from "./token";
import Stocks from "./stocks";
import PatientDiagnosis from "./PatientDiagnosis";
import CardView from "./cardItemView";
// import Login from "../Login";

//import { Switch } from "@mui/material";

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
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
      path: "/admin/cardview",
    },
    {
      text: "User Management",
      icon: <Badge sx={iconTheme} />,
      path: "/admin/usermanagement",
    },
    {
      text: "Stocks",
      icon: <Inventory sx={iconTheme} />,
      path: "/admin/stocks",
    },
    {
      text: "Lab",
      icon: <Biotech sx={iconTheme} />,
      path: "/admin/cardview",
    },
    {
      text: "Token",
      icon: <ConfirmationNumber sx={iconTheme} />,
      path: "/admin/tokenview",
    },
  ];

  // const ProfileHeader = () => {
  //   return <div>Hello</div>;
  // };

  const routes = [{ path: "/" }];
  // const useCurrentPath = () => {
  //   const location = useLocation();
  //   // const [{ route }] = matchRoutes(routes, location);
  //   console.log(location);
  //   const route = "/";

  //   return route;
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
              <ListItemText primary='Admin' />
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

        <List sx={{ paddingRight: 2, paddingTop: 30 }}>
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
        // className='main-content'
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: "Background.default",
          p: 3,
        }}
      >
        <Toolbar />
        <Box className='main-content'></Box>

        <Routes>
          <Route index path='/admin/cardview' element={<CardView />} />
          <Route path='/admin/usermanagement' element={<UserManagement />} />
          <Route path='/admin/tokenview' element={<TokenView />} />
          <Route path='/admin/stocks' element={<Stocks />} />
          <Route
            path='/admin/patientdiagnosis'
            element={<PatientDiagnosis />}
          />
          <Route path='/admin/tokenview/*' element={<PatientDiagnosis />} />
        </Routes>
      </Box>
      <Outlet />
    </Box>
  );
}
