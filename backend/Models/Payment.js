import mongoose from 'mongoose';

const paymentModel = new mongoose.Schema({

    razorpay_payment_id: {
        type: String,
        required: true,
    }, 
    razorpay_subscription_id:{
        type: String,
        required: true,
    }, 
    razorpay_signature:{
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },

});


const Payment = mongoose.model('Payment', paymentModel);
export default Payment;
