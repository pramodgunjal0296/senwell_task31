import { lazy } from "react";

// login module route

const Login = lazy(() => import("../components/Login.js"));

// TaskList
const TaskList = lazy(() => import("../components/TaskList.js"));

const configureRoute = [
  {
    path: "/",
    element: <Login />,
    private: false,
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
    private: false,
  },
  {
    path: "/task",
    exact: true,
    element: <TaskList />,
    private: true,
  },
];

export default configureRoute;
