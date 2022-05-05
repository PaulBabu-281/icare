import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import CardView from "./screens/admin/cardItemView";
// import UserManagement from "./screens/admin/userManagement";
// import TokenView from "./screens/admin/token";
// import Stocks from "./screens/admin/stocks";
// import PatientDiagnosis from "./screens/admin/PatientDiagnosis";
// import Admin from "./screens/admin/admin_dashboard";
// import Login from "./screens/Login";

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path='/' element={<App />} />
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
