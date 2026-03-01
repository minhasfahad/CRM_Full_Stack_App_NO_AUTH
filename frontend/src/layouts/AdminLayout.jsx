import React, { useEffect, useState } from "react";
import "./AdminLayout.css";
import { Link, Outlet } from "react-router";
import api from "../api/axios.js";
const AdminLayout = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchTotals = async () => {
    try {
      const customer = await api.get("/customers");
      console.log(customer);

      const users = await api.get("/users");

      setTotalCustomers(customer.data.totalCustomers);
      setTotalUsers(users.data.totalUsers);
    } catch (error) {
      console.error(error);

      console.log("Error Fetching Data from Database.");
    }
  };
  useEffect(() => {
    fetchTotals();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="adminbar col-span-2 h-screen sticky top-0">
          <h1 className="adminheading">Admin Panel</h1>
          <hr></hr>
          <div className="adminlinks">
            <p
              style={{
                color: "rgba(255, 255, 255, 0.51)",
                fontSize: "15px",
                padding: "10px 0px",
              }}
            >
              MANAGEMENT
            </p>{" "}
            <ul>
              <li>
                <Link to="/admin/add-customer">
                  <i class="fa-solid fa-plus"></i>Add Customer
                </Link>
              </li>
              <li>
                <Link to="/admin/add-user">
                  <i class="fa-solid fa-user"></i>Add Users
                </Link>
              </li>
              <li>
                <Link to="/admin/view-customers">
                  <i class="fa-solid fa-book"></i>View All Customers
                </Link>
              </li>
              <li>
                <Link to="/admin/view-users">
                  <i class="fa-solid fa-user-group"></i>View All Users
                </Link>
              </li>
            </ul>
            <div className="backtohome">
              <Link to="/">🏠 Bach To Home</Link>
            </div>
          </div>
        </div>
        {/* Right side Content */}
        <div className="main-content col-span-10">
          <div className="grid grid-cols-12 ">
            <div className="col-span-6 gap-4 total">
              <h3 className="totalheading">Total Customers</h3>
              <h2 className="totalcount">{totalCustomers}</h2>
            </div>
            <div className="col-span-6 gap-4 total">
              <h3 className="totalheading">Total Users</h3>
              <h2 className="totalcount">{totalUsers}</h2>
            </div>
          </div>
          <div className="area">
            <Outlet context={{fetchTotals}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
