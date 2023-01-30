import express from 'express';

import { login, register, logout, getMyProfile, changePassword, updateProfile,deleteMyProfile, updateProfilePicture, forgetPassword, resetPassword,removeFromPlaylist,  addToPlaylist, getAllUsers, changeUserRole, deleteUser } from '../controllers/UserController.js';
import { authorizedAdmin, isAuthenticated } from '../Middlewares/isAuthenticated.js';
import singleUpload from '../Middlewares/multer.js';

const router = express.Router();

// To Register New User
router.route("/register").post(singleUpload, register);

// Login
router.route("/login").post(login);

// Logout
router.route("/logout").get(logout);


// Get My Profile
router.route("/myProfile").get(isAuthenticated, getMyProfile);


// Delete My Profile
router.route("/myProfile").delete(isAuthenticated, deleteMyProfile);

// Change Password
router.route("/changePassword").put(isAuthenticated, changePassword);


// Update Profile
router.route("/updateProfile").put(isAuthenticated, updateProfile);

// Update profile picture
router.route("/updateProfilePicture").put(isAuthenticated, singleUpload , updateProfilePicture);

// Forget Password
router.route("/forgetPassword").post(forgetPassword);

// Reset Password
router.route("/resetPassword/:token").put(resetPassword);

// Add to Playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove from Playlist

router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers);

router.route("/admin/users/:id").put(isAuthenticated, authorizedAdmin, changeUserRole).delete(isAuthenticated, authorizedAdmin, deleteUser);



export default router;