import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Auth/login";
import Register from "./Auth/register";
import Account from "./UserProfile/Account";
import Main from "./Main";
import PlacesPage from "./PlacesPage";
import Booked from "./UserProfile/Booked";
const Static_uri = "http://localhost:5000/Models/Uploads";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main Static_uri={Static_uri} />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/account/:subPage?",
    element: <Account />,
  },
  {
    path: "/account/:subPage/:id",
    element: <Account />,
  },
  {
    path: "/placespage/booked/:id",
    element: <Booked Static_uri={Static_uri} />,
  },
  {
    path: "/placespage/:id",
    element: <PlacesPage Static_uri={Static_uri} />,
  },
]);

export default router;
