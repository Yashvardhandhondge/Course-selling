const {Router} = require('express');
const { z } = require('zod');
const {adminModel,courseModel, ActivityLogModel}= require('../db')
const adminRouter = Router();
const bcrypt = require('bcrypt')
const {Jwt_admin_secrte} = require('../config')
const jwt = require('jsonwebtoken')
const {app} = require('../middleware/adminmiddleware')
const {logActivity} = require('../middleware/logActivity')

const { admincourse } = require('./admincourses');


adminRouter.use('/course',admincourse)

adminRouter.post('/signup',async function(req,res){
    try{
          const requiredbody = z.object({
            email:z.string().min(3).max(100).email(),
            password:z.string().min(1).max(30),
            firstname:z.string().min(3).max(30),
            lastname:z.string().min(3).max(100),
            image:z.string().optional()
          })

          const parsedbody = await requiredbody.safeParse(req.body);

          if(!parsedbody.success){
            res.status(404).json({
                message :"You have entered wrong input",
                error : parsedbody.error
            })
            return
          }
      
          const {email,password,firstname,lastname,image}=req.body;

          const hashedpassword =await bcrypt.hash(password,5)
          
          const admin = await adminModel.create({
              email:email,
              password : hashedpassword,
              firstname:firstname,
              lastname : lastname,
              image:image
          })
          

          if(admin){
            const token = await jwt.sign({
                id:admin._id
             },Jwt_admin_secrte)

             await ActivityLogModel.create({
                adminId:admin._id,
                action:'Signup',
                details:`AdminSigned up at ${new Date().toLocaleString()}`,
             })

            res.status(200).json({
                message:"Admin Created successfully",
                token,
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
        
        const admin = await adminModel.findOne({email})

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

     await ActivityLogModel.create({
        adminId:admin._id,
        action:'Signin',
        details:`Admin logged in at ${new Date().toLocaleString()}`,
     })


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


adminRouter.use(logActivity);

adminRouter.put("/update",app,async function(req,res){
    try{
        const requiredbody= z.object({
            email:z.string().min(3).max(100).email().optional(),
            password:z.string().min(1).max(30).optional(),
            firstname:z.string().min(3).max(30).optional(),
            lastname:z.string().min(3).max(100).optional(),
            image:z.string().optional()
        })

        const parsedbody = requiredbody.safeParse(req.body);
        if(!parsedbody.success){
            res.status(400).json({
                message:"You have entered something wrong",
                error : parsedbody.error
            })
            return
        }
        const amdinid = req.adminId
        const {email,password,firstname,lastname,image} = req.body;

        const UpdateBody = {};
        if(email){
            UpdateBody.email = email;
        }
        if(firstname){
            UpdateBody.firstname = firstname;
        }
        if(lastname){
            UpdateBody.lastname = lastname;
        }
        if(image){
            UpdateBody.image = image;
        }
        if(password){
            const hashedpassword =  await bcrypt.hash(password,5);
            UpdateBody.password = hashedpassword
        }
        const updatedbody = await adminModel.findByIdAndUpdate(
            amdinid,
            UpdateBody,
            {
            new:true
        })

        if(updatedbody){
            res.status(200).json({
                message:"Admin Updated successfully",
                updatedbody:updatedbody
            })
        }else{
            res.status(400).json({
                message:"admin not updated"
            })
        }
    }catch(e){
          console.error(e)
    }
})

adminRouter.delete('/delete',app,async function(req,res){
   try{
    const requiredbody= z.object({
        email:z.string().min(3).max(100).email().optional(),
    })

    const parsedbody = requiredbody.safeParse(req.body);
    if(!parsedbody.success){
        res.status(400).json({
            message:"You have entered something wrong",
            error : parsedbody.error
        })
        return
    } 
    const adminId = req.adminId
    const {email} = req.body;

    const delteadmin = await adminModel.findByIdAndDelete({
        _id:adminId,
        email:email
    });

    if(delteadmin){
        res.status(200).json({
            message:"Admin delted successfully",
            delteadmin:delteadmin
        })
    }else{
        res.status(404).json({
            message:"something error occured",
        })
    }
   }catch(e){
    console.error(e)
   }
})



adminRouter.get('/profile', app, async function(req, res) {
    try {
        const adminId = req.adminId; 
  console.log(adminId)
        const admin = await adminModel.findById(adminId).select('-password'); 

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        res.status(200).json({
            message: "Admin profile retrieved successfully",
            admin
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "An error occurred while retrieving the admin profile",
            error: e.message
        });
    }
});


module.exports={
    adminRouter : adminRouter
}