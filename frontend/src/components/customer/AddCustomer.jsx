import React, { useState } from "react";
import "./AddCustomer.css";
import { useNavigate, useOutletContext } from "react-router";
import api from "../../api/axios";


export const AddCustomer = () => {

  const navigate = useNavigate();

  const {fetchTotals} = useOutletContext();

  const [getCustomerName, setCustomerName] = useState("");
  const [getCustomerEmail, setCustomerEmail] = useState("");
  const [getCustomerPhone, setCustomerPhone] = useState("");
  const [getCustomerCompany, setCustomerCompany] = useState("");
  const [getSelectedStatus, setSelectedStatus] = useState("New");
  const [getCustomerAssignedTo, setCustomerAssignedTo] = useState("");

  const status = ["New", "Contacted", "In Progress", "Closed"];

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    const customer = {
      name: getCustomerName,
      email: getCustomerEmail,
      phone: getCustomerPhone,
      company: getCustomerCompany,
      status: getSelectedStatus,
      assignedTo: getCustomerAssignedTo,
    };

    const onSuccess = (response) => {
      alert("Customer saved succesfully");
      console.log(response.data);
      navigate("/admin/view-customers");

      fetchTotals();
    };

    const onError = (error) => {
      alert("Error while saving the record");
      
      console.error(error);
    };

    api.post("/customers", customer).then(onSuccess).catch(onError);
  };

  return (
    <>
      <div className="customerform">
        <h1>Add New Customer</h1>
        <hr></hr>
        <form onSubmit={HandleOnSubmit}>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <div className="label-input">
                <label>Full Name </label>
                <input
                  value={getCustomerName}
                  type="text"
                  required
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="label-input">
                <label>Email</label>
                <input
                  value={getCustomerEmail}
                  type="email"
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div className="label-input">
                <label>Phone Number</label>
                <input
                  type="text"
                  value={getCustomerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="col-span-6">
              <div className="label-input">
                <label>Company</label>
                <input
                  type="text"
                  value={getCustomerCompany}
                  onChange={(e) => setCustomerCompany(e.target.value)}
                />
              </div>
              <div className="label-input">
                <label>Status</label>
                <select
                  name="status"
                  value={getSelectedStatus} // This controls which option is selected
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {status.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="label-input">
                <label>Assigned To</label>
                <input
                  type="text"
                  value={getCustomerAssignedTo}
                  onChange={(e) => setCustomerAssignedTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="customerbutton">
            Register Customer
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
