import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminPage.css";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { FaBus } from "react-icons/fa";
import { FaBusinessTime } from "react-icons/fa6";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload(); // Reload the page to reset the state
  };

  return (
    <div className="admin-page">
      <div className="admin-page-wrapper">
        <div className="admin-page-cnt">
          <div className="admin-sidebar">
            <div className="sidebar-content">
              <h1>Admin</h1>
              <ul className="sidebar-lists">
                <li>
                  <NavLink to="dashboard" className="nav-link">
                    <div className="sidebar-heads">
                      <span>{<TbLayoutDashboardFilled />}</span>
                      <h4>DashBoard</h4>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="passengerDetails" className="nav-link">
                    <div className="sidebar-heads">
                      <span>{<FaBus />}</span>
                      <h4> Passenger Details</h4>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="busDetails" className="nav-link">
                    <div className="sidebar-heads">
                      <span>{<FaBusinessTime />}</span>
                      <h4> Bus Details</h4>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="driverDetails" className="nav-link">
                    <div className="sidebar-heads">
                      <span>{<IoIosPeople />}</span>
                      <h4> Driver Details</h4>
                    </div>
                  </NavLink>
                </li>
              </ul>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </div>
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
