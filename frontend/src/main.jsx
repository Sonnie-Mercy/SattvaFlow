import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { getUserFromStorage } from "./features/user/userSclice.js";

import PrivateRoute from "./components/PrivateRoute.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import YogaPage from "./pages/YogaPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <App />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "yoga-class/:id",
            element: <YogaPage />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

store.dispatch(getUserFromStorage());

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://yoga-day.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
