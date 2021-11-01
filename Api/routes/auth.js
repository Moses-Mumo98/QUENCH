const Router = require('express').Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const user = require('../models/user');
const SALT = bcrypt.genSaltSync(8);




//signup
Router.post('/signup', async (req, res)=>{
    console.log(req.body)
    try{
        const usernameExists = await user.findOne({fullname:req.body.fullname});
        if(usernameExists){
            return res.status(403).json({success:false, message: "usernameExists"})
        }

        const newUser = await User.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: bcrypt.hashSync (req.body.password, SALT),
        })
        const { password:pass, ...authenticatedUser } = newUser._doc;
        res.status(200).json({
            success: true,
            data: authenticatedUser,
        });

    } catch (error){
       res.status(500).send({
           success: false,
           data: error,
       })
    }
 })

 Router.post('/login', async(req, res)=>{
     const {email, password} = req.body;

     const user = await User.findOne({email}).exec();
     if (!user){
         return res.status(404).json({success:false, message: 'User Not Found'});

     }
     //check if password is correct
     const match = bcrypt .compareSync(password,user.password);
     if (!match){
        return res.status(403).json({success:false, message: 'Incorrect credentials'});

    }
    const { password:pass, ...authenticatedUser } = user._doc;
    return res.status(200).json({success:true, data:authenticatedUser});
 })
 module.exports = Router;