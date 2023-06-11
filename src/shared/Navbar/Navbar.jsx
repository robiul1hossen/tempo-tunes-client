import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { useContext, useEffect, useState } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setThem] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "localTheme"
  );
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setThem("night");
    } else {
      setThem("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

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
            <>
              <div className="font-bold">
                <Link onClick={handleLogout} to="/login">
                  Log Out
                </Link>
              </div>
              <img
                className="rounded-[50%] leading-[40px] w-[40px] h-[40px] ms-5"
                src={user.photoURL}
                alt=""
              />
            </>
          ) : (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )}
          <div className="ms-3">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input onChange={handleToggle} type="checkbox" />

              {/* sun icon */}
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
