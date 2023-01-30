import express from 'express';
import { getAllCourses, createCourse, getAllLectures, createLectures, deleteLecture , deleteCourse} from '../controllers/courseController.js';
import { authorizedAdmin, authorizedSubscriber, isAuthenticated } from '../Middlewares/isAuthenticated.js';
import singleUpload from '../Middlewares/multer.js';

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// Create new Course - Only Admin
router.route("/createCourse").post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);

// Add Lectures, Delete Course, Get Course Details - Only Admin
router.route("/course/:id").get(isAuthenticated, authorizedSubscriber, getAllLectures);
router.route("/course/:id").post(isAuthenticated, authorizedAdmin, singleUpload, createLectures);
router.route("/course/:id").delete(isAuthenticated,  authorizedAdmin, singleUpload, deleteCourse);

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizedAdmin, deleteLecture);

export default router;