const userModel=require('../models/user.model');
const userService=require('../service/user.service');
const {validationResult}=require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');


module.exports.registerUser=async(req,res,next)=>{
    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    console.log(req.body);

    const {fullname,lastname,email,password}=req.body;

    const hashedPassword = await userModel.hashPassword(password);
    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    });

    const token=await user.generateAuthToken();
    res.status(201).json({token,user});

}

module.exports.loginUser=async(req,res,next)=>{
    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    const {email,password}=req.body;
    
    const user=await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'INVALID CREDENTIALS'});
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'INVALID CREDENTIALS'});
    }

    const token =user.generateAuthToken();
    res.cookie('token',token,);
    res.status(200).json({token,user})


}

module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token= req.cookies.token|| req.headers.authorization.split(' ')[1];
    const blacklistToken=new blackListTokenModel({token});
    res.status(200).json({message:'LOGGED OUT SUCCESSFULLY'});
}