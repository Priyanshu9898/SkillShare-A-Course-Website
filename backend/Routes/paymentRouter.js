import express from "express";
import { cancelSubscription, createSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";
import { isAuthenticated } from "../Middlewares/isAuthenticated.js";

const router = express.Router();


// Buy verification
router.route("/subscribe").get(isAuthenticated, createSubscription);

// Payment verification
router.route("/verifyPayment").post(isAuthenticated, paymentVerification);

// Get Razorpay key
router.route("/razorpayKey").get(getRazorPayKey);

// Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;