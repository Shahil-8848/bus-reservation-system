import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AdminPage.css";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { FaBus } from "react-icons/fa";
import { FaBusinessTime } from "react-icons/fa6";
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
                    <span>{<TbLayoutDashboardFilled />}</span> DashBoard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="passengerDetails" className="nav-link">
                    <span>{<IoIosPeople />}</span> Passenger Details
                  </NavLink>
                </li>
                <li>
                  <NavLink to="busDetails" className="nav-link">
                    <span>{<FaBus />}</span> Bus Details
                  </NavLink>
                </li>
                <li>
                  <NavLink to="driverDetails" className="nav-link">
                    <span>{<FaBusinessTime />}</span> Drivers Details
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
