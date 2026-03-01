import express from 'express';
import {SignUp, Login } from '../controllers/authControllers.js';

const authRoutes = express.Router();

authRoutes.post('/signup', SignUp);
authRoutes.post('/login', Login);

export default authRoutes;