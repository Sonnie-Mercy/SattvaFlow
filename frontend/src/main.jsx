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
  // other routes can be added here
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
