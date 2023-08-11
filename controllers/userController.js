const ErrorHander = require("../utils/errorhander")
const catchAsyncError=require('../middleware/catchAsyncError')
const User=require('../models/userModel');
const sendToken = require("../utils/jwtToken");

//register a user/////////////////////////////////////////////////////////////////////
exports.registerUser=catchAsyncError(async(req,res,next)=>{
  const {email,password}=req.body;

const checkEmail = await User.findOne({ email });
if (checkEmail){
    return next(new ErrorHander("Email Already Taken", 422));
}
    const user=await User.create({
        email,password,

    })
    sendToken(user,200,res)
  
})






//login a user////////////////////////////////////////////////////////////////////
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});



//logout //////////////////////////////////////////////////////////////////////////
exports.logout=catchAsyncError(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
res.status(200).json({
    success:true,
    message:"logout successfully"
})
})


  //get user details
  exports.getUserDetails=catchAsyncError(async (req,res,next)=>{
    const  user =await User.findById(req.user.id)

   res.status(200).json({
     success:true,
     user,
   })
  })



