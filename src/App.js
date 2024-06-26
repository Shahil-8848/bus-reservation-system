import Home from "./Pages/Home/Home";

import "./App.css";

import SignIn from "./Authetication/SignIn";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Login from "./Authetication/Login";
import BusSearch from "./Pages/SearchBus/BusSearch";
import Form from "./Pages/Form/Form";
import { useEffect, useState } from "react";
import { BusProvider } from "./BusContext";
import { UserNameProvider } from "./UserNameContext";
import Booking from "./Pages/AdminPanel/Booking";

import AdminPage from "./Pages/AdminPanel/AdminPage";
import DashBoard from "./Pages/AdminPanel/DashBoard";
import BusDetails from "./Pages/AdminPanel/BusDetails";
// import Booking from "./Pages/Booking/Booking";

function App() {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const savedUserRole = localStorage.getItem("userRole");
    if (savedUserRole) {
      setUserRole(savedUserRole);
    }
  }, []);

  return (
    <UserNameProvider>
      <BusProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login setUserRole={setUserRole} />}
            />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/search" element={<BusSearch />} />
            <Route path="/form" element={<Form />} />

            {userRole === "admin" && (
              <Route path="/admin" element={<AdminPage />}>
                <Route path="passengerDetails" element={<Booking />} />
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="busDetails" element={<BusDetails />} />
                <Route path="" element={<Navigate to="dashboard" />} />{" "}
                {/* Redirect to Dashboard by default */}
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </BusProvider>
    </UserNameProvider>
  );
}
export default App;
// localStorage.setItem("username",username);
