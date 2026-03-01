import React, { useState } from "react";
import "./AdminLayout.css"; // Reuse your layout CSS
import { Link } from "react-router";
import api from "../api/axios.js";

const MemberLayout = () => {
  const [memberName, setMemberName] = useState("");
  const [assignedCustomers, setAssignedCustomers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // 2. Logic: Fetch using the query parameter (?name=...)
      const response = await api.get(`/customers/search?name=${memberName}`);
      
      // 3. Logic: Extract 'customer' array from backend response
      setAssignedCustomers(response.data.customer || []);
    } catch (error) {
      console.error(error);
      alert("Error searching for assignments.");
    }
  };

 return (
  <div className="grid grid-cols-12 gap-4 min-h-screen">
    {/* Sidebar Section */}
    <div className="adminbar col-span-2 h-screen sticky top-0 bg-[#111322]">
      <h1 className="adminheading">Team Member Panel</h1>
      <hr />
      <div className="adminlinks">
        <p
          style={{
            color: "rgba(255, 255, 255, 0.51)",
            fontSize: "15px",
            padding: "10px 0px",
          }}
        >
          MANAGEMENT
        </p>
        <ul>
          <li className="mb-2">
            <Link to="/team-member" className="hover:text-blue-400">
              <i className="fa-solid fa-tasks mr-2"></i> Current Leads
            </Link>
          </li>
        </ul>
        <div className="backtohome">
          <Link to="/">🏠 Back To Home</Link>
        </div>
      </div>
    </div>

    {/* Main Content Section */}
    <div className="main-content col-span-10 p-8">
      <div className="area bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Find My Assigned Customers</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter your name (e.g., Umer)..."
            className="border border-gray-300 p-3 rounded w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium transition"
          >
            Search
          </button>
        </form>

        {/* Result Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-left font-semibold text-gray-600">Customer Name</th>
              <th className="p-4 text-left font-semibold text-gray-600">Company</th>
              <th className="p-4 text-left font-semibold text-gray-600">Current Status</th>
              <th className="p-4 text-left font-semibold text-gray-600">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {assignedCustomers.length > 0 ? (
              assignedCustomers.map((c) => (
                <tr key={c._id} className="border-b hover:bg-blue-50 transition">
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4 text-gray-600">{c.company}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase">
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{c.assignedTo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-12 text-center text-gray-400 italic">
                  {memberName
                    ? "No records found for this name."
                    : "Enter your name to load assigned tasks."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div> 
  </div> 
);
};

export default MemberLayout;