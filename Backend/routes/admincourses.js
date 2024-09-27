const {Router} = require('express');
const {app} = require('../middleware/adminmiddleware')
const {adminmodel,course} = require('../db');
const { z } = require('zod');
const admincourse = Router();

admincourse.post('/create',app,async function(req,res){
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

admincourse.put('/add-lesson',async function(req,res){
    try{
      const lessonSchema = z.object({
        courseId : z.string(),
        lesson:z.array(
            z.object({
                title:z.string(),
                content:z.string().optional(),
                videoUrl:z.string().optional(),
                duration:z.number().optional()
            })
        )
      })

      const parsedbody = lessonSchema.safeParse(req.body);
      if(!parsedbody){
        return res.status(400).json({
            message:"Invalid lesson data",
            error:parsedbody.error
        })
      }
    }catch(e){
        console.error(e)
    }
})

admincourse.put('/update',async function(req,res){
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

admincourse.get('/get',async function(req,res){
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
    admincourse:admincourse,
}