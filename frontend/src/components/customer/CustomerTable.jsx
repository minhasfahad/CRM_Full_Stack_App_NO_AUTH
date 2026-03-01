import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AddCustomer.css";
import { Link, useLocation, useOutletContext } from "react-router";

export const CustomerTable = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");
  const isManager = location.pathname.includes("/manager");

  const { fetchTotals } = useOutletContext();
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      console.log(response.data);
      setCustomers(response.data.customer || []);
      // alert("All Customers Data Fetched Sucessfuly!")
    } catch (error) {
      console.log("Error Getting All Customers", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (id) => {
    if (!window.confirm("Are you sure?")) return; // Optional safety check
    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
      alert("Record Deleted Successfuly!");
      if (fetchTotals) fetchTotals();
    } catch (error) {
      alert("Error Deleting the Record");
      console.log("Error Deleting the Record");
    }
  };

  return (
    <>
      <div className="customer-table-container p-4 ">
        <h1 className="cust-list">Customer List</h1>
        <hr></hr>
        <br></br>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assigned To</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((c, index) => (
                <tr key={c._id || index} className="border-b hover:bg-gray-50">
                  {/* Accessing fields based on your console log */}
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.company}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        c.status === "Closed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">{c.assignedTo}</td>
                  {isAdmin ? (
                    <td className="p-3 flex gap-2">
                      {/* Edit Link */}
                      <Link
                        to={`/admin/update-customer/${c._id}`}
                        className="text-center text-blue-600 hover:underline border p-2 hover:text-black hover:bg-indigo-100 w-15"
                      >
                        Edit
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteCustomer(c._id)}
                        className="text-red-600 hover:underline border p-1 hover:text-black hover:bg-indigo-100"
                      >
                        Delete
                      </button>
                    </td>
                  ) : (
                    <td className="p-4 text-gray-400 italic">
                 
                      <Link
                        to={`/admin/update-customer/${c._id}`}
                        className="text-center text-blue-600 hover:underline border p-2 hover:text-black hover:bg-indigo-100 w-15"
                      >
                        Edit
                      </Link>
                    </td> // Fallback for non-admins
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No customers found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default CustomerTable;
