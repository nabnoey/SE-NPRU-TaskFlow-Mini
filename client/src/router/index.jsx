import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layout/MainLayout";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import TaskDashboard from "../pages/task/TaskDashboard";
import TaskDetails from "../pages/task/TaskDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <TaskDashboard />,
      },
      {
        path: "/task/:id",
        element: <TaskDetails />,
      },
    ],
  },
]);

export default router;
