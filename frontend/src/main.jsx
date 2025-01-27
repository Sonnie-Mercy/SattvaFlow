import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store"; // Updated to import the named export
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx"; // Importing Login component
import SignUp from "./pages/SignUp.jsx"; // Importing SignUp component
import Home from "./pages/Home.jsx"; // Importing Home component
import "./index.css"; // Importing the CSS file

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />, // Adding route for Login
  },
  {
    path: "/signup",
    element: <SignUp />, // Adding route for SignUp
  },
  {
    path: "/home",
    element: <Home />, // Adding route for Home
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}> {/* Wrap the RouterProvider with Provider */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
