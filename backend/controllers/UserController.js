import { catchAsyncError } from "../Middlewares/catchAsyncError.js";
import { User } from "../Models/User.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { sendEmail } from "../Utils/SendEmail.js";
import { sendToken } from "../Utils/SendToken.js";
import crypto from "crypto";
import { Course } from "../Models/Course.js";
import cloudinary from "cloudinary";
import getDataUri from "../Utils/dataUri.js";
import { Stats } from "../Models/Stats.js";


export const register = catchAsyncError(async (req, res, next) => {

    const {name, email, password} = req.body;
    const file = req.file;
    // const file = req.file;
    // console.log(name, email, password);

    if(!name || !email || !password){
        return next(new ErrorHandler("Please Enter All Fields", 400));
    }

    let user = await User.findOne({email});

    if(user){
        return next(new ErrorHandler("User Already Exist", 409));
    }

    // Upload file on cloudinary
    
    const fileUri = getDataUri(file);
  
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);


    user = await User.create({
        
        name, 
        email, 
        password, 
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    }

    );

    // console.log(user);

    sendToken(res, user, "Registered Successfully", 201);
    

});


export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // console.log(email, password);
  
    if (!email || !password)
      return next(new ErrorHandler("Please enter all field", 400));
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));
  
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch)
      return next(new ErrorHandler("Incorrect Email or Password", 401));
  
    sendToken(res, user, `Welcome back, ${user.name}`, 200);
  });


export const logout = catchAsyncError(async (req, res, next) => {

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }).json({
        success : true,
        message: "You have been logged out Successfully",
    })
});


export const getMyProfile = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.user._id);
    // console.log(user);

    res.status(200).json({
      success: true,
      user,
    });
  });

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if(!user){
        return next(new ErrorHandler("Not Logged In", 401));
    }

    const name = user.name;
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();


    res.status(200).cookie(token , null, {
        expires: new Date(Date.now())
    }).json({
        success : true,
        message: `User ${name} deleted successfully.`

    })

});


export const changePassword = catchAsyncError(async (req, res, next) => {
    const {oldPassword, newPassword} = req.body;

    // console.log(oldPassword, newPassword);

    if(!oldPassword || !newPassword){
        return next(new ErrorHandler("Please Enter All the Fields", 401));
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);

    if(!isMatch){
        return next(new ErrorHandler("Password does not match", 401));
    }

    user.password = newPassword;

    await user.save();


    res.status(200).json({
        success : true,
        message : "Password changed successfully",

    })

});


export const updateProfile = catchAsyncError(async (req, res, next) => {

    const {name, email} = req.body;

    const user = await User.findById(req.user._id);

    if(email) user.email = email;
    if(name) user.name = name;

    await user.save();

    
    res.status(200).json({
        success : true,
        message : "Profile updated successfully",

    })

});


export const updateProfilePicture = catchAsyncError(async (req, res, next) => {
    
    const file = req.file;

    // console.log(file);

    const fileUri = getDataUri(file);

    console.log(req.user.avatar.public_id);

    await cloudinary.v2.uploader.destroy(req.user.avatar.public_id);


    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    req.user.avatar = {
        public_id : myCloud.public_id,
        url : myCloud.secure_url,
    }

    await req.user.save();
    
    res.status(200).json({
        success : true,
        message : "Profile picture updated successfully",

    })

});



export const forgetPassword = catchAsyncError(async (req, res, next) => {
    
    const {email} = req.body;
    // console.log(email);
    const user = await User.findOne({email});

    // console.log(user);

    if(!user){
        return next(new ErrorHandler("User Does Not exist", 401));
    }

    const resetToken = await user.getResetToken(); 
    // console.log(resetToken)

    await user.save();


    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `Click on the Link to reset your password. ${url}. if you have not requested then please ignore.`

    await sendEmail(user.email, "SkillShare Reset Password", message);


    res.status(200).json({
        success: true,
        message: `Reset Token has been sent to ${user.email}`,
      });

});



export const resetPassword = catchAsyncError(async (req, res, next) => {
    
    const token = req.params.token;
    // console.log(token);

    

    const resetPasswordToken =  crypto.createHash("sha256").update(token).digest("hex");
    const expire =  Date.now() + 15 * 60 * 1000;
    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now(),
        }
    })

    if(!user){
        return next(new ErrorHandler("Link has been expired", 401));
    }

    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    res.status(200).json({
        success : true,
        message : "Password reset Successfully",

    })

});


export const addToPlaylist = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.user._id);;

    const course = await Course.findById(req.body.id);

    if(!course){
        return next(new ErrorHandler("Invalid Course Id", 401));
    }

    const itemExit = user.playlist.find((item) => {
        if(item.course.toString() === course._id.toString()){
            return true;
        }
    })


    if(itemExit){
        return next(new ErrorHandler("Item Already Exist", 409));
    }

    user.playlist.push({
        course: course._id,
        poster: course.poster.url,
    });

    await user.save();


    res.status(200).json({
        success : true,
        message : "Added to Playlist Successfully",

    })

});

export const removeFromPlaylist = catchAsyncError(async (req, res, next) => {
    

    const user = await User.findById(req.user._id);;

    const course = await Course.findById(req.query.id);

    if(!course){
        return next(new ErrorHandler("Invalid Course Id", 401));
    }

    const newPlaylist = user.playlist.filter((item) => {
        if(item.course.toString() !== course._id.toString()){
            return item;
        }
    })

    user.playlist = newPlaylist;

    await user.save();
    

    res.status(200).json({
        success : true,
        message : "Course Removed successfully",

    })

});


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    

    const users = await User.find({});

    

    res.status(200).json({
        success : true,
        users

    })

});


export const changeUserRole = catchAsyncError(async (req, res, next) => {
    

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User Does Not exist", 401));
    }

    const prevRole = user.role;
    let newRole  = "";

    if(user.role === "user"){
        user.role = "admin";
        newRole = "admin";
    }
    else{
        user.role = "user";
        newRole = "user";
    }
    
    await user.save();

    // console.log(user.role);

    res.status(200).json({
        success : true,
        message : `Role Updated Successfully from ${prevRole} to ${newRole}`

    })

});


export const deleteUser = catchAsyncError(async (req, res, next) => {
    

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User Does Not exist", 401));
    }

    const name = user.name;

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await user.remove();



    res.status(200).json({
        success : true,
        message: ` User ${name} deleted successfully`

    })

});


User.watch().on("change", async () => {

    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);
  
    const subscription = await User.find({ "subscription.status": "active" });

    stats[0].users = await User.countDocuments();
    stats[0].subscription = subscription.length;
    stats[0].createdAt = new Date(Date.now());
  
    await stats[0].save();
  });
  