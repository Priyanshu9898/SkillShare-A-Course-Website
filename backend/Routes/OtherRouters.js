import express from "express";
import { contact, courseRequest, getDashboardStats } from "../controllers/OtherController.js";
import { authorizedAdmin, isAuthenticated } from "../Middlewares/isAuthenticated.js";


const router = express.Router();

// Contact Form
router.route('/contact').post(contact);

// Request Form
router.route('/requestCourse').post(courseRequest);

// Admin Dashboard Stats
router.route('/admin/stats').get(isAuthenticated, authorizedAdmin, getDashboardStats);

export default router;