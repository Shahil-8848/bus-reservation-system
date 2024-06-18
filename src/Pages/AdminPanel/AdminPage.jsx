import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
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
                    DashBoard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="passengerDetails" className="nav-link">
                    Passenger Details
                  </NavLink>
                </li>
                <li>
                  <NavLink to="busDetails" className="nav-link">
                    Bus Details
                  </NavLink>
                </li>
                <li>
                  <NavLink to="driverDetails" className="nav-link">
                    Drivers Details
                  </NavLink>
                </li>
              </ul>
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
