const {Router} = require('express');
const { z } = require('zod');
const { usermodel, adminmodel, course} = require('../db');
const adminRouter = Router();
const bcrypt = require('bcrypt')
const {Jwt_admin_secrte} = require('../config')
const jwt = require('jsonwebtoken')
const {app} = require('../middleware/adminmiddleware')
// const adminRouter = express.Router()
adminRouter.get("/check", res => {
    res.res.send("Healthy")
})

adminRouter.post('/signup',async function(req,res){
    try{
          const requiredbody = z.object({
            email:z.string().min(3).max(100).email(),
            password:z.string().min(1).max(30),
            firstname:z.string().min(3).max(30),
            lastname:z.string().min(3).max(100)
          })

          const parsedbody = await requiredbody.safeParse(req.body);

          if(!parsedbody.success){
            res.status(404).json({
                message :"You have entered wrong input",
                error : parsedbody.error
            })
            return
          }
      
          const {email,password,firstname,lastname}=req.body;

          const hashedpassword =await bcrypt.hash(password,5)
          
          const admin = await adminmodel.create({
              email:email,
              password : hashedpassword,
              firstname:firstname,
              lastname : lastname
          })

          if(admin){
            res.status(200).json({
                message:"User Created successfully",
                admin,
                id:admin._id,
               craetedAt: admin.createdAt
            })
          }
    }catch(e){
             console.log(e)
             res.json(e)
    }

})
adminRouter.post('/signin',async function(req,res){
    try{

        const requiredbody = z.object({
           email:z.string().min(3).max(100).email(),
           password:z.string().min(3).max(30)
        })
   
        const parsedbody = requiredbody.safeParse(req.body);
   
        if(!parsedbody.success){
           res.status(404).json({
               message:"You have enetred wrong credentials",
               error:parsedbody.error
           })
           return
        }
   
        const {email,password} = req.body;
        
        const admin = await adminmodel.findOne({email})

        if(!admin){
            return res.status(404).json({
                message:"Admin not found"
            })
        }
        const correctpassowrd = await bcrypt.compare(password,admin.password);
         if(!correctpassowrd){
           res.status(400).json({
               message:`You have entered wrong password ${password}`,
           })
         }else{

     const token = await jwt.sign({
        id:admin._id
     },Jwt_admin_secrte)

           res.status(200).json({
               alert:"Password verified successfully",
               message:'You have logged in',
               admin,
               id:admin._id,
               token:token,
           })
         }

    }catch(e){
        console.error(e)
    }
})


adminRouter.post('/courses',app,async function(req,res){
  try{
   const requiredbody = z.object({
    title :z.string(),
    description:z.string(),
    imageUrl : z.string(),
    price:z.string(),
    category:z.string(),
    difficulty:z.string()
   })

   const parsedbody = requiredbody.safeParse(req.body);
   if(!parsedbody.success){
    res.status(404).json({
        message:"You have entered something wrong",
        error : parsedbody.error
    })
    return
   }
   const adminId = req.userId
   const {title, description,imageUrl,price,category,difficulty} = req.body;
   
   const courses = await course.create({
      title : title,
      description:description,
      imageUrl:imageUrl,
      price:price,
      creatorId:adminId,
      category:category,
      difficulty:difficulty      
   })

   if(courses){
       res.status(200).json({
        message:"Course craeted ",
        courses,
        id:courses._id
       })
   }
  } catch(e){
     console.error(e)
  }   
})

adminRouter.put('/courses',app,async function(req,res){
    try{
        const adminId = req.userId;
        const {title,description,imageUrl,price,courseId,category,difficulty} = req.body;
        const courses = await course.updateOne({
            _id:courseId,
            creatorId:adminId
        },{
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price,
            category:category,
            difficulty:difficulty
        },{
            new : true
        })
        
        if(courses){
           res.status(200).json({
            message:"Course updated successfully",
            courses
           })
        }
    }catch(e){
    console.error(e)
    }

})

adminRouter.get('/courses',app,async function(req,res){
    try{
     const adminId = req.userId;
     const courses = await course.find({
        creatorId:adminId
     });
     if(course){
        res.status(200).json({
            message:"Here are your courses",
            courses

        })
     }
    }catch(e){
       console.error(e)
    }
    
})
module.exports={
    adminRouter : adminRouter
}