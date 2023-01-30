import express from "express";
// import Payment from "../Models/Payment.js";
import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import crypto from "crypto";
import { instance } from "../server.js";
import Payment from "../Models/Payment.js";


export const createSubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if(user.role === "admin"){
        return next(new ErrorHandler("Admin Can Not Buy Subscription", 400));
    }



    const plan_id = process.env.PLAN_ID || "plan_L4jiNrtKU5dL2W";

    // console.log(plan_id);
    const subscription = await instance.subscriptions.create({
        plan_id,
        customer_notify : 1,
        total_count : 1,

    })



    user.subscription.id = subscription.id;

    user.subscription.status = subscription.status;

    await user.save();

  
    res.status(200).json({
        success: true,
        subscriptionId: subscription.id
    })

  });


  export const paymentVerification = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id);

    const {razorpay_payment_id, razorpay_subscription_id, razorpay_signature} = req.body;
    
    // console.log(razorpay_payment_id, razorpay_subscription_id, razorpay_signature);

    const subscriptionId =  user.subscription.id;


    const generated_signature = crypto.createHmac("sha256" , process.env.RAZORPAY_API_SECRET).update(
        razorpay_payment_id + "|" + subscriptionId, "utf-8"
    ).digest("hex");

    const isAuthentic = generated_signature === razorpay_signature;

    // console.log(isAuthentic);


    if(!isAuthentic){
        return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`)
    }
    
    await Payment.create({
        razorpay_payment_id, 
        razorpay_subscription_id, 
        razorpay_signature
    });


    user.subscription.status = "active";

    await user.save();

  
    return res.redirect(`${process.env.FRONTEND_URL}/paymentSuccess?reference=${razorpay_payment_id}`)

  });



  
  export const getRazorPayKey = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_API_KEY,
    });
  });
  
  export const cancelSubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    const subscriptionId = user.subscription.id;
    let refund = false;
  
    await instance.subscriptions.cancel(subscriptionId);
  
    const payment = await Payment.findOne({
      razorpay_subscription_id: subscriptionId,
    });

    // console.log(payment);
  
    const gap = Date.now() - payment.createdAt;
  
    const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;
  
    if (refundTime > gap) {
      await instance.payments.refund(payment.razorpay_payment_id);
      refund = true;
    }
  
    await payment.remove();
    user.subscription.id = undefined;
    user.subscription.status = undefined;
    await user.save();
  
    res.status(200).json({
      success: true,
      message: refund
        ? "Subscription cancelled, You will receive full refund within 7 days."
        : "Subscription cancelled, Now refund initiated as subscription was cancelled after 7 days.",
    });
  });
  

