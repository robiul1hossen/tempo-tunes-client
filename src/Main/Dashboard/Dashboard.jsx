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

const Dashboard = () => {
  const isAdmin = true;
  return (
    <div className="drawer md:drawer-open">
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
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItem">
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaBars></FaBars> Manage Items
                  <span className="indicator-item badge badge-secondary"></span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageitems">
                  <FaBook></FaBook> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allstudents">
                  <FaUsers></FaUsers> All Students
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservations">
                  <FaCalendarAlt></FaCalendarAlt> Reservations
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/mycart">
                  <FaShoppingCart></FaShoppingCart> My Cart
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
            <NavLink to="/">
              <FaBars></FaBars> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaShoppingBag></FaShoppingBag> Shopping
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
  );
};

export default Dashboard;
