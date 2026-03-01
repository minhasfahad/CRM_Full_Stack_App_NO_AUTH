import React from "react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router";
import "./AddUser.css";
import "../customer/AddCustomer.css";

export const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const roles = ["Admin", "Manager", "Team Member"];

  useEffect(() => {
    const fetcUserDetails = async () => {
      try {
        const userdetails = await api.get(`/users/${id}`);

        const data = userdetails.data.user;

        setName(data.name || "");
        setEmail(data.email || "");
        setRole(data.role || "");
      } catch (error) {
        alert("Error Getting User with provided ID", id);
      }
    };
    fetcUserDetails();
  }, [id]);

  const HandelUpdateUser = async (e) => {
    e.preventDefault();

    const updatedUser = { name: name, email: email, role: role };

    try {
      await api.put(`/users/${id}`, updatedUser);
      alert("User Updated Successfully.");
      navigate("/admin/view-users");
    } catch (error) {
      alert("Error Updating User.");
    }
  };
  return (
    <>
      <div className="userform">
        <h1>Update User</h1>
        <hr></hr>
        <form onSubmit={HandelUpdateUser}>
          <div className="label-input ">
            <label>User Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="label-input">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="label-input">
            <label>Select Role</label>
            <select
              name="role"
              value={role} // React now controls the selection
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="customerbutton">
            Update User
          </button>
          <button
            type="button"
            className="customerbutton"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};
export default UpdateUser;
