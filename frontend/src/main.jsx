import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store"; 
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx"; 
import SignUp from "./pages/SignUp.jsx"; 
import Home from "./pages/Home.jsx"; 
import Dashboard from "./pages/Dashboard.jsx"; 
import Register from "./pages/Register.jsx"; 
import AboutUs from "./pages/AboutUs.jsx"; // Importing About Us component
import "./index.css"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/about",
    element: <AboutUs />, // Adding route for About Us
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
