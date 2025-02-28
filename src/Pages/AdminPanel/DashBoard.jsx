import React, { useState, useEffect } from "react";
import { FaBus, FaUser, FaDollarSign, FaClipboardList } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const [passengerCount, setPassengerCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentBookings, setRecentBookings] = useState([
    {
      passengerName: "Ram karki",
      busName: "Bus A",
      route: "Route 1",
      date: "2024-06-12",
      time: "10:00 AM",
    },
    {
      passengerName: "Himal Koirala",
      busName: "Bus B",
      route: "Route 2",
      date: "2024-06-12",
      time: "11:00 AM",
    },
  ]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("http://localhost:8081/users/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dashboard data:", data);

        setPassengerCount(data.totalPassengers);
        setTotalRevenue(data.totalRevenue);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert(
          "An error occurred while fetching dashboard data: " + error.message
        );
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1> Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <FaUser className="stat-icon" />
          <div className="stat-info">
            <h2>{passengerCount}</h2>
            <p>Total Passengers</p>
          </div>
        </div>
        <div className="stat-card">
          <FaDollarSign className="stat-icon" />
          <div className="stat-info">
            <h2>Rs {totalRevenue}</h2>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <FaBus className="stat-icon" />
          <div className="stat-info">
            <h2>7</h2>
            <p>Total Buses</p>
          </div>
        </div>
        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <div className="stat-info">
            <h2>5</h2>
            <p>Routes</p>
          </div>
        </div>
      </div>
      <div className="recent-bookings">
        <h2>Recent Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>Bus</th>
              <th>Route</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.passengerName}</td>
                <td>{booking.busName}</td>
                <td>{booking.route}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
