import React, { useState, useEffect } from "react";
import Admin from "./screens/admin/admin_dashboard";
// import logo from './logo.svg';
// import './App.css';
import Login from "./screens/Login";
//import { useNavigate } from "react-router-dom";

function App() {
  const LOCAL_STORAGE_KEY_USER = "user";
  const LOCAL_STORAGE_KEY_PASSWORD = "password";
  const users = {
    userid: "admin",
    password: "admin",
  };

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
  //   console.log(user);
  // }, [user]);

  useEffect(() => {
    const userLocalSaveUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
    const userLocalSavePassword = localStorage.getItem(
      LOCAL_STORAGE_KEY_PASSWORD
    );
    console.log(userLocalSaveUser);
    if (userLocalSaveUser) {
      setUserid(userLocalSaveUser);
      setPassword(userLocalSavePassword);
    }
  }, []);

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  //const [success, setSuccess] = useState(false);

  const LoginDetail = (details) => {
    //  console.log(details);
    if (
      details.userid === users.userid &&
      details.password === users.password
    ) {
      //setUser({ ...user, name: details.userid, password: details.password });
      setUserid(details.userid);
      setPassword(details.password);
      localStorage.setItem(LOCAL_STORAGE_KEY_USER, details.userid);
      localStorage.setItem(LOCAL_STORAGE_KEY_PASSWORD, details.password);
      console.log("Logged In");
      //console.log(user);
    }
  };

  const Logout = () => {
    setUserid("");
    setPassword("");
    // setUser({ name: "", email: "" });
    //console.log("loiu");
  };

  // const successHandler = (success) => {
  //   setSuccess(...success, success);
  // };

  return (
    <div style={{ height: "100%" }}>
      {userid !== "" ? (
        <Admin LogoutFunc={Logout} />
      ) : (
        <Login
          LoginDetail={LoginDetail}
          //error={error}
        />
      )}
    </div>
  );
}

export default App;
