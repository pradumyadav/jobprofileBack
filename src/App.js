import React from "react";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Protected from "./features/auth/components/Protected";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import LecturePage from "./pages/LecturePage";
import JobForm from "./features/ApplyForm/JobForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        {" "}
        <HomePage />{" "}
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/course",
    element: (
      <Protected>
        <CoursePage />,
      </Protected>
    ),
  },
  {
    path: "/lecture",
    element: (
      <Protected>
        <LecturePage />,
      </Protected>
    ),
  },
  {
    path: "/jobform",
    element: (
      <Protected>
        <JobForm/>,
      </Protected>
    ),
  },
]);

function App() {
  return <div className="App">{<RouterProvider router={router} />}</div>;
}

export default App;
