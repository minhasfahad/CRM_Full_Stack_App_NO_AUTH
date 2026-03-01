// import dotenv from "dotenv";
import cors from "cors";
import express from 'express';
import ConnectDB from './config/db.js';
import customerRoutes from "./routes/customerRoutes.js"
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
// dotenv.config();
const app = express();


// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // your React frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/api/customers", customerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)



const PORT = process.env.PORT || 8000;
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Is running on Port: ${PORT}`);
    });
}).catch(err => {
    console.error("Error Stratting the Server: ", err);
});