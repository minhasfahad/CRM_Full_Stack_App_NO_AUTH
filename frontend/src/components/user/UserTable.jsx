import React, { useEffect, useState } from "react";
import "../customer/AddCustomer.css";
import api from "../../api/axios";
import { useOutletContext , Link, useLocation } from "react-router";

export const UserTable = () => {

  const location = useLocation();
  const isAdmin = location.pathname.includes("/admin");

  const { fetchTotals } = useOutletContext();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      console.log("All Users Fetched Successfuly!");
      console.log(response.data);

      setUsers(response.data.user || []);
      // alert("All Users Data Fetched Sucessfuly!")
    } catch (error) {
      console.log("Error Getting All Users", error);
      alert("Error Getting Users from DB.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return; // Optional safety check
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
      alert("User Deleted Successfully!");
      if (fetchTotals) fetchTotals();
    } catch (error) {
      alert("Error Deleting User!");
      console.log("Error Deleting the Record");
    }
  };
  return (
    <>
      <div>
        <h1 className="cust-list">User List</h1>
        <hr></hr>
        <br></br>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          {users.length > 0 ? (
            users.map((u, i) => (
              <tr key={u._id || i} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      u.role === "Admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                {
                  isAdmin ? (
                    <td className="p-3 flex gap-2">
                  <Link
                    to={`/admin/update-user/${u._id}`}
                    className=" p-1 text-center text-blue-600 hover:underline border-1 p-1 hover:text-black hover:bg-indigo-100 w-15"
                  >
                    Edit
                  </Link>

                  {/* Delete Button - Passes the unique ID to the function */}
                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    className="text-red-600 hover:underline border-1 p-1 hover:text-black hover:bg-indigo-100"
                  >
                    Delete
                  </button>
                </td>
                  ) : (
                    <td className="p-3 text-gray-400 italic">No Actions</td>
                  )
                }
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <p>No Data Found in DB</p>
              </td>
            </tr>
          )}
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};
export default UserTable;
