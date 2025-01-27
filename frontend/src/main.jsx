import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import "./index.css"; // Importing the CSS file

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
<<<<<<< HEAD
  // other routes can be added here
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
=======
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
    element: <App />, // Render App directly to show Footer
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
  {
    path: "*",
    element: <Navigate to="/" />, // Redirect to landing for any unknown routes
  },
]);

store.dispatch(getUserFromStorage());

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://sattvaflow.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
>>>>>>> 424ae89c5bedae1e8e1fc2c4138daccb902ed09c
  </React.StrictMode>
);