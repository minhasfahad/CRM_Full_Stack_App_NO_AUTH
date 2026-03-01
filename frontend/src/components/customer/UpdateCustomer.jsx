import React, { useEffect, useState} from "react";
import "./AddCustomer.css";
import { useNavigate, useParams } from "react-router";
import api from "../../api/axios";

export const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [getCustomerName, setCustomerName] = useState("");
  const [getCustomerEmail, setCustomerEmail] = useState("");
  const [getCustomerPhone, setCustomerPhone] = useState("");
  const [getCustomerCompany, setCustomerCompany] = useState("");
  const [getSelectedStatus, setSelectedStatus] = useState("");
  const [getCustomerAssignedTo, setCustomerAssignedTo] = useState("");

  const status = ["New", "Contacted", "In Progress", "Closed"];

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const custdetails = await api.get(`/customers/${id}`);

        const data = custdetails.data.customer;

        setCustomerName(data.name);
        setCustomerEmail(data.email);
        setCustomerPhone(data.phone);
        setCustomerCompany(data.company);
        setSelectedStatus(data.status);
        setCustomerAssignedTo(data.assignedTo);
      } catch (error) {
        alert("Could not Find the Customer with the provided id: ", id);
      }
    };

    fetchCustomerDetail();
  }, [id]);

  const HandelUpdateCustomer = async (e) => {
    e.preventDefault();
    const updaedCustomer = {
      name: getCustomerName,
      email: getCustomerEmail,
      phone: getCustomerPhone,
      company: getCustomerCompany,
      status: getSelectedStatus,
      assignedTo: getCustomerAssignedTo,
    };

    try {
      await api.put(`/customers/${id}`, updaedCustomer);
      alert("Customer Updated Sucessfuly!");
      navigate("/admin/view-customers");
    } catch (error) {
      alert("Error Updating Customer.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="customerform">
        <h1>Update Customer</h1>
        <hr></hr>
        <form onSubmit={HandelUpdateCustomer}>
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
            Update Customer
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
export default UpdateCustomer;
