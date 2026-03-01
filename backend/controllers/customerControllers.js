import Customer from "../models/customerModel.js";
// import cloudinary from "../config/cloudinary.js";

// Create Customer In Database

export const createCustomer = async(req, res) => {
    try {

        // let photo = req.file?.path || "https://res.cloudinary.com/dudamnl40/image/upload/v1766593714/default-person_z8ejrv.jpg";

        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                message: "Customer Name and  Phone cannot be empty!"
            });
        }

        const customer = new Customer(req.body);
        await customer.save();

        console.log("Customer Created in Database successfuly!");

        res.status(201).json({
            message: "Customer Created in Database successfuly!",
            customer
        });

    } catch (error) {
        console.error("Error Creating Customer: ", error);

        res.status(500).json({
            message: "Error creating Customer in Database, Internal Server Error!"
        });
    }
}

export const getAllCustomers = async(req, res) => {
    try {

        // pagination
        // const page = parseInt(req.query.page) || 1;
        // const limit = parseInt(req.query.limit) || 5; // items per page
        // const skip = (page - 1) * limit;

        const totalCustomers = await Customer.countDocuments();

        const customer = await Customer.find();

        // .skip(skip)
        // .limit(limit)
        // .sort({ createdAt: -1 }); // optional: newest first

        res.status(200).json({
            succsess: true,
            message: "All Customers Fetched Successfuly!",
            customer,
            totalCustomers
        });
    } catch (error) {
        console.log("Error Fetching all Customers: ", error)
        res.status(500).json({
            succsess: false,
            message: "Internal Server Error."
        });
    }
}

export const getSingleCustomer = async(req, res) => {
    try {
        const { id } = req.params;

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                message: "No Customer found with the Provided ID.",
                id
            });
        }
        res.status(200).json({
            message: "Single Customer Fetched Successfuly!",
            customer
        });
    } catch (error) {

        // If someone sends an invalid MongoDB ObjectId (e.g., /123), findById() will throw a CastError.
        // To handle this cleanly, you can detect it like this:
        if (error.name === "CastError") {
            res.status(400).json({
                message: "Invalid Customer ID Format."
            });
        }
        res.status(500).json({
            succsess: false,
            message: "Internal Server Error."
        })
    }
}

// Find by id and Update
export const updateCustomer = async(req, res) => {
    try {
        const { id } = req.params;

        const existingcustomer = await Customer.findById(id);

        if (!existingcustomer) {
            return res.status(404).json({
                message: "No Customer found with the Provided ID.",
                id
            });
        }

        let updatedData = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { $set: updatedData })

        res.status(200).json({
            message: "Customer information updated sucessfully!",
            updatedCustomer
        });
    } catch (error) {

        // If someone sends an invalid MongoDB ObjectId (e.g., /123), findById() will throw a CastError.
        // To handle this cleanly, you can detect it like this:
        if (error.name === "CastError") {
            res.status(400).json({
                message: "Invalid Customer ID Format."
            });
        }
        res.status(500).json({
            succsess: false,
            message: "Internal Server Error."
        })
    }
}

export const deleteCustomer = async(req, res) => {
    try {

        const { id } = req.params;
        const findCustomer = await Customer.findById(id);

        if (!findCustomer) {
            res.status(404).jason({
                message: "No Customer Exist with the Provided ID in Database",
                id
            })
        }

        await Customer.findByIdAndDelete(id);

        res.status(200).json({
            message: "Customer Deleted Successfully!"
        })

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid product ID format."
            });
        }

        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

// Get only Assigned to Customers Data

export const getAssignedToCustomers = async(req, res) => {
    try {
        const { name } = req.query;

        const customer = await Customer.find({
            assignedTo: { $regex: name, $options: "i" }
        });

        res.status(200).json({
            message: "Customers Fetched Successfuly",
            customer
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}