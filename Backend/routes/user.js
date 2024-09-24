const {Router} = require('express');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const { usermodel } = require('../db');
const userRouter = Router();

userRouter.post('/signup',async function(req,res){
    try{

    
 const requiredbody = z.object({
    email:z.string().min(3).max(100).email(),
    password:z.string().min(1).max(30),
    firstname:z.string(),
    lastname:z.string()
 })
 const parsedbody =await requiredbody.safeParse(req.body);
 if(!parsedbody){
    res.status(404).json({
        message:"You have enterd something wrong",
        error:parsedbody.error
    })
    return
 }
 const {email,password,firstname,lastname} = req.body;

 const hashedpassword =await bcrypt.hash(password,5);

 const user = await usermodel.create({
    email:email,
    password:hashedpassword,
    firstname:firstname,
    lastname:lastname
 })

 if(user){
    res.status(200).json({
        message:"User craeted succesfully",
        user,
        id:user._id
    })
 }else{
    res.status(400).json({
        message:"Failed to craete user"
    })
 }
}catch(e){
 console.error(e)        
}
})

userRouter.post('/signin',async function(req,res){
  try{
  const requiredbody = z.object({
    email:z.string().min(3).max(100),
    password:z.string().min(1).max(30)
  })

  const parsedbody = requiredbody.safeParse(req.body);

  if(!parsedbody.success){
    res.status(400).json({
        message:"You have wriiten something worng",
        error:parsedbody.error
    })
  }

  }catch(e){
    console.error(e)
  }

})

userRouter.get('/purchases',function(req,res){

   
})

module.exports = {
    userRouter : userRouter
}