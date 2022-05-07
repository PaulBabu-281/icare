import React, { useState, useEffect } from "react";

export function loginHandler() {
  const LOCAL_STORAGE_KEY_USER = "user";
  const LOCAL_STORAGE_KEY_PASSWORD = "password";
  const users = {
    userid: "admin",
    password: "admin",
  };
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
    localStorage.setItem(LOCAL_STORAGE_KEY_USER, "");
    localStorage.setItem(LOCAL_STORAGE_KEY_PASSWORD, "");
    //  navigate("/");
  };
  function getUserid() {
    return userid;
  }
}
