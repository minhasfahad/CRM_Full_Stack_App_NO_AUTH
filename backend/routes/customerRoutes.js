import { createCustomer, deleteCustomer, getAllCustomers, getAssignedToCustomers, getSingleCustomer, updateCustomer } from "../controllers/customerControllers.js";
import express from "express"
// import upload from "../middleware/upload.js";

const customerrouter = express.Router();

customerrouter.get("/search", getAssignedToCustomers);

//Create Customer
customerrouter.post("/", createCustomer)

//Get All Customers
customerrouter.get("/", getAllCustomers)

//Get Single Customers
customerrouter.get("/:id", getSingleCustomer)

// Update Customer Information
customerrouter.put("/:id", updateCustomer)

// Delete Customer
customerrouter.delete("/:id", deleteCustomer)

export default customerrouter;


//  {
//     "name": "Waqas Ahmed Minhas",
//     "email": "waqasahmed@gmail.com",
//     "phone": "0321-4154076",
//     "company": "Punjab Police",
//     "status": "New",
//     "assignedTo": [ "DSP" ]
//  }