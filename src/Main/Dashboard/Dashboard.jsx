import { useContext, useEffect, useState } from "react";
import {
  FaBars,
  FaBook,
  FaCalendarAlt,
  FaEnvelope,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
  FaWallet,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import Navbar from "../../shared/Navbar/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const accessToken = localStorage.getItem("access-token");
  useEffect(() => {
    fetch("https://tempo-tunes-server.vercel.app/students", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  let isAdmin = false;
  let isInstructor = false;
  let isStudent = false;
  const loggedUser = users.find((singleUser) => singleUser.email === user.email);
  if (loggedUser?.role === "admin") {
    isAdmin = true;
  } else if (loggedUser?.role === "instructor") {
    isInstructor = true;
  } else {
    isStudent = true;
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="drawer md:drawer-open my-4">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          <Outlet></Outlet>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content">
            <div className="mx-auto flex flex-col items-center mb-10 mt-5">
              <img
                className="w-[100px] h-[100px] rounded-[50%] leading-[100px] "
                src={user.photoURL}
                alt=""
              />
              <p className="font-bold mt-2">{user.displayName}</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminhome">
                    <FaHome></FaHome> Admin Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/manageclasses">
                    <FaBars></FaBars> Manage Classes
                    <span className="indicator-item badge badge-secondary"></span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allstudents">
                    <FaUsers></FaUsers> All Students
                  </NavLink>
                </li>
              </>
            ) : isInstructor ? (
              <>
                <li>
                  <NavLink to="/dashboard/instructorDashboard">
                    <FaHome></FaHome> Instructor Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addaclass">
                    <FaCalendarAlt></FaCalendarAlt> Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myclasses">
                    <FaShoppingCart></FaShoppingCart> My Classes
                    <span className="indicator-item badge badge-secondary"></span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/studenthome">
                    <FaHome></FaHome> Student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/selectedclass">
                    <FaCalendarAlt></FaCalendarAlt> Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/mycart">
                    <FaShoppingCart></FaShoppingCart> Enrolled Classes
                    <span className="indicator-item badge badge-secondary"></span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/history">
                    <FaWallet></FaWallet>Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome></FaHome>Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/instructorpage">
                <FaBars></FaBars> Instructor
              </NavLink>
            </li>
            <li>
              <NavLink to="/approvedclasses">
                <FaShoppingBag></FaShoppingBag> Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/">
                <FaEnvelope></FaEnvelope> Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
