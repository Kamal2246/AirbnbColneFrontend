import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Header from "./Header";
import Rootes from "./Rootes";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <Header />
      <RouterProvider router={Rootes} />
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
