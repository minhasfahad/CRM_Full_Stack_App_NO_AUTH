import express from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userControllers.js";

const userrouter = express.Router();



userrouter.post("/", createUser);

userrouter.get("/", getAllUsers);

userrouter.get("/:id", getSingleUser);

userrouter.put("/:id", updateUser);

userrouter.delete("/:id", deleteUser);



export default userrouter;