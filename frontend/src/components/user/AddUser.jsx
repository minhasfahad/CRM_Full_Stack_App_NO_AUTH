import React, { useEffect, useState } from "react";
import api from "../../api/axios"; // Your hard-coded axios instance
import "./AddUser.css";
import "../customer/AddCustomer.css";
import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";

const AddUser = () => {

  const {fetchTotals} = useOutletContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("Team Member");

  // On component rendered
  //   useEffect(() => {}, [selectedRole]);

  // Validation variables
  const [usernameClasses, setUsernameClasses] = useState();

  const roles = ["Admin", "Manager", "Team Member"];

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Validate data if needed

    // Create object with server prototype by mapping front variables
    const user = {
      name: username,
      email,
      role: selectedRole,
    };

    const onSuccess = (response) => {
      alert("User saved succesfully");
      console.log(response.data);

      fetchTotals();
      navigate("/admin/view-users");

    };

    const onError = (error) => {
      alert("Error while saving the record");
      console.error(error);
    };

    api.post("/users", user).then(onSuccess).catch(onError);
  };

  return (
    <>
      <div className="userform">
        <h1>Add User</h1>
        <hr></hr>
        <form onSubmit={onSubmitHandler}>
          <div className="label-input ">
            <label>User Name</label>
            <input
              type="text"
              className={usernameClasses}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() =>
                setUsernameClasses(username.length < 4 ? "bg-red-500" : "")
              }
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
              value={selectedRole} // React now controls the selection
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="customerbutton">
            Register User
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUser;
