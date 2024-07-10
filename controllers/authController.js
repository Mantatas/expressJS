const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id)=>{
    return jwt.sign({id:id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

exports.signup = async (req, res)=>{
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm     
        });
        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );
        res.status(201).json({
            status: 'success',
            data: newUser,
            token
        })
    } catch(err){
        res.status(400).json({
            status: 'failed.',
            message: err.message
        })
    }
}

exports.login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        //1. check email and pw exist
        if(!email || !password){
            throw new Error("Please provide email and password")
        }
        //2. check if user and pw is correct
        const user = await User.findOne({email}).select('+password');
        if(!user || !(await user.correctPassword(password, user.password))){
            throw new Error("Incorrect password and email")
        }
        const token = signToken(user.id);
        //3. if everything is ok, send token to client
        res.status(201).json({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            },
            token
        })
    }catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}