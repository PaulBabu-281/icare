import React, { useState, useEffect } from "react";
import Admin from "./screens/admin/admin_dashboard";
import Pharm from "./screens/pharamacy/pharmacy_dashboard";
import Login from "./screens/Login";
import Doctor from "./screens/Doctor/Doctor";
import {
  Route,
  // Router,
  Routes,
  useNavigate,
} from "react-router-dom";

import toast from "./components/snackbar";

import { Helmet } from "react-helmet";

import { useDispatch } from "react-redux";

import axios from "axios";
import { saveDetails } from "./redux/userSlice";

function App() {
  const TITLE = "iDoc";

  const LOCAL_STORAGE_KEY_USER = "user";
  const LOCAL_STORAGE_KEY_PASSWORD = "password";
  const LOCAL_STORAGE_KEY_ROLE = "role";
  const LOCAL_STORAGE_KEY_NAME = "name";

  let navigate = useNavigate();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    //dispatch(updatePatientList());
    // const tokenList = getTokenList();
    // console.log(tokenList);
    // dispatch(getToken(tokenList));
    const userLocalSaveUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    const userLocalSavePassword = localStorage.getItem(
      LOCAL_STORAGE_KEY_PASSWORD
    );
    const userLocalSaveUserRole = localStorage.getItem(LOCAL_STORAGE_KEY_ROLE);
    const userLocalSaveUserName = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
    const userNameRole = {
      user_name: userLocalSaveUserName,
      user_role: userLocalSaveUserRole,
    };
    // console.log(userLocalSaveUser);
    if (userLocalSaveUser) {
      setUserid(userLocalSaveUser);
      setPassword(userLocalSavePassword);
      setRole(userLocalSaveUserRole);
      setName(userLocalSaveUserName);
      setisLogedin(true);
      dispatch(saveDetails(userNameRole));
    }
  }, []);

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [isLogedin, setisLogedin] = useState(false);
  // const [LoggedInUser, setLoggedInUser] = useState("");
  // const [error, setError] = useState("");
  //const [success, setSuccess] = useState(false);
  var setLoggedInUser = false;
  const LoginDetail = async (details) => {
    const instance = axios.create({
      baseURL: "https://deploy-test-idoc.herokuapp.com",
    });

    await instance
      .post("/signin", {
        user_password: details.password,
        user_mail: details.userid,
      })
      .then((response) => {
        console.log(response.data.data);
        setisLogedin(true);
        setLoggedInUser = true;
        setUserid(details.userid);
        setPassword(details.password);
        setRole(response.data.data.user_role);
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, details.userid);
        localStorage.setItem(LOCAL_STORAGE_KEY_PASSWORD, details.password);
        localStorage.setItem(
          LOCAL_STORAGE_KEY_ROLE,
          response.data.data.user_role
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEY_NAME,
          response.data.data.user_name
        );
        toast.success("Welcome " + response.data.data.user_name);
        dispatch(saveDetails(response.data.data));
        //console.log("Logged In");
        // console.log(userid);
        // snackbar("saved", "success");
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong!");
      });
  };

  const Logout = () => {
    setUserid("");
    setPassword("");
    setRole("");
    setName("");
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, "");
    localStorage.setItem(LOCAL_STORAGE_KEY_PASSWORD, "");
    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, "");
    localStorage.setItem(LOCAL_STORAGE_KEY_ROLE, "");
    setisLogedin(false);
    navigate("/");
    // setUser({ name: "", email: "" });
    //console.log("loiu");
  };

  //App.use(cors());

  // const successHandler = (success) => {
  //   setSuccess(...success, success);
  // };
  return (
    <div style={{ height: "100%" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{TITLE}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {role == "admin" ? (
        <Admin LogoutFunc={Logout} />
      ) : role == "doctor" ? (
        <Doctor LogoutFunc={Logout} />
      ) : role == "pharm" ? (
        <Pharm LogoutFunc={Logout} />
      ) : (
        <Login
          LoginDetail={LoginDetail}
          //error={error}
        />
      )}
      <Routes>
        <Route path="/login" element={<Login LoginDetail={LoginDetail} />} />
        {/* <Route exact path='/admin' element={<Admin />} /> */}
        {/* <Route path='/admin/cardview' element={<CardView />} />
        <Route path='/admin/usermanagement' element={<UserManagement />} />
        <Route path='/admin/tokenview' element={<TokenView />} />
        <Route path='/admin/stocks' element={<Stocks />} />
        <Route path='/admin/patientdiagnosis' element={<PatientDiagnosis />} />
        <Route path='/admin/tokenview/*' element={<PatientDiagnosis />} /> */}
      </Routes>
    </div>
  );
}

export default App;
