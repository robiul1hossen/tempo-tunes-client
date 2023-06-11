import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  let isAdmin = false;
  let isInstructor = false;
  let isStudent = false;
  const loggedUser = users.find((singleUser) => singleUser?.email === user?.email);
  if (loggedUser?.role === "admin") {
    isAdmin = true;
  } else if (loggedUser?.role === "instructor") {
    isInstructor = true;
  } else {
    isStudent = true;
  }

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("log out successful");
      })
      .then((error) => console.log(error));
  };

  const navItems = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link to="/instructorpage">Instructors</Link>
      </li>
      <li>
        <Link to="approvedclasses">Classes</Link>
      </li>
      {user && (
        <li>
          {isAdmin ? (
            <Link to="/dashboard/allstudents">Dashboard </Link>
          ) : isInstructor ? (
            <Link to="/dashboard/myclasses">Dashboard </Link>
          ) : (
            <Link to="/dashboard/studenthome">Dashboard </Link>
          )}
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-10">
      <div className="navbar bg-[#D1A054] ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">TEMPO TUNES</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              <Link onClick={handleLogout} to="/login">
                Log Out
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
