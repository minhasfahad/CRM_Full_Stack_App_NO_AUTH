import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
// Import Pages
import Home from "./pages/Home";
// Import Layouts (These will wrap your role-specific content)
import AdminDashboardHome from "./components/admin/Home";
import ManagerDashboardHome from "./components/manager/Home";

import AdminLayout from "./layouts/AdminLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import MemberLayout from "./layouts/MemberLayout";

import AddCustomer from "./components/customer/AddCustomer";
import CustomerTable from "./components/customer/CustomerTable";
import UpdateCustomer from "./components/customer/UpdateCustomer";

import AddUser from "./components/user/AddUser";
import UserTable from "./components/user/UserTable";
import UpdateUser from "./components/user/UpdateUser";

function App() {
  return (
    <Routes>
      {/* 1. The Entry Point (Home Page) */}
      <Route path="/" element={<Home />} />
      {/* 2. Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* These are Child Routes (Self-closing is easier here) */}
        <Route index element={<AdminDashboardHome />} />
        <Route path="add-customer" element={<AddCustomer />} />
        <Route path="add-user" element={<AddUser />} />
        <Route path="view-customers" element={<CustomerTable />} />
        <Route path="view-users" element={<UserTable />} />
        <Route path="update-customer/:id" element={<UpdateCustomer />} />
        <Route path="update-user/:id" element={<UpdateUser />} />
      </Route>
      {/* This is the closing tag for the Admin Parent */}
      {/* 3. Manager Routes */}
      <Route path="/manager" element={<ManagerLayout />}>
        {/* Manager specific pages go here */}
        <Route index element={<ManagerDashboardHome />} />
        <Route path="view-customers" element={<CustomerTable />} />
        <Route path="view-users" element={<UserTable />} />
      </Route>
      {/* 4. Team Member/User Routes */}
      <Route path="/team-member" element={<MemberLayout />}>
        {/* User specific pages go here */}
      </Route>
    </Routes>
  );
}

export default App;
