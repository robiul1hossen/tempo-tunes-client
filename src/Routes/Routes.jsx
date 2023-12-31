import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Main/Dashboard/Dashboard";
import PrivateRoute from "../pages/PrivateRoute/PrivateRoute";
import AllStudents from "../pages/Dashboard/AdminDashboard/AllStudents";
import InstructorDashboard from "../pages/Dashboard/InstructorDashboard/InstructorDashboard";
import StudentHome from "../pages/Dashboard/StudentDahsboard/StudentHome";
import AddAClass from "../pages/Dashboard/InstructorDashboard/AddAClass";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses/MyClasses";
import InstructorPage from "../pages/Home/InstructorPage/InstructorPage";
import ManageClasses from "../pages/Dashboard/AdminDashboard/ManageClasses";
import AllApprovedClasses from "../pages/AllApprovedClasses/AllApprovedClasses";
import MySelectedClasses from "../pages/Dashboard/StudentDahsboard/MySelectedClasses";
import Error from "../pages/Error/Error";
import Payment from "../pages/Dashboard/StudentDahsboard/Payment";
import PaymentHistory from "../pages/Dashboard/StudentDahsboard/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "instructorpage",
        element: <InstructorPage></InstructorPage>,
      },
      {
        path: "approvedclasses",
        element: <AllApprovedClasses></AllApprovedClasses>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "manageclasses",
        element: <ManageClasses></ManageClasses>,
      },
      {
        path: "allstudents",
        element: <AllStudents></AllStudents>,
      },
      {
        path: "instructorDashboard",
        element: <InstructorDashboard></InstructorDashboard>,
      },
      {
        path: "addaclass",
        element: <AddAClass></AddAClass>,
      },
      {
        path: "myclasses",
        element: <MyClasses></MyClasses>,
      },
      {
        path: "studenthome",
        element: <StudentHome></StudentHome>,
      },
      {
        path: "selectedclass",
        element: <MySelectedClasses></MySelectedClasses>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "history",
        element: <PaymentHistory></PaymentHistory>,
      },
    ],
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);

console.log(router);
export default router;
