const {Router} = require('express');
const {app} = require('../middleware/adminmiddleware')
const {courseModel} = require('../db');
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
        const adminId = req.adminId
        const {title, description,imageUrl,price,category,difficulty,level,tags} = req.body;
        
        const courses = await courseModel.create({
           title : title,
           description:description,
           imageUrl:imageUrl,
           price:price,
           creatorId:adminId,
           category:category,
           difficulty:difficulty,
           level:level,
           tags:tags      
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
admincourse.put('/add-lesson', app, async function(req, res) {
    try {
        const lessonSchema = z.object({
            courseId: z.string(),
            lessons: z.array(
                z.object({
                    title: z.string(),
                    content: z.string().optional(),
                    videoUrl: z.string().optional(),
                    duration: z.string().optional()
                })
            )
        });

        const parsedbody = lessonSchema.safeParse(req.body);
        if (!parsedbody.success) { 
            return res.status(400).json({
                message: "Invalid lesson data",
                error: parsedbody.error
            });
        }

        const { courseId, lessons } = parsedbody.data; 

        
        const updatedCourses = await courseModel.findByIdAndUpdate(
            courseId,
            { $push: { lessons: { $each: lessons } } },
            { new: true, useFindAndModify: false }
        );

        if (updatedCourses) {
            res.status(200).json({
                message: "Lesson added successfully",
                updatedCourses
            });
        } else {
            res.status(404).json({
                message: "Course not found"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

admincourse.put('/add-lesson/:courseId', app, async function(req, res) {
    try {
        
        const lessonSchema = z.object({
            lessons: z.array(
                z.object({
                    title: z.string(),
                    content: z.string().optional(),
                    videoUrl: z.string().optional(),
                    duration: z.string().optional()
                })
            )
        });

        const parsedbody = lessonSchema.safeParse(req.body);
        if (!parsedbody.success) { 
            return res.status(400).json({
                message: "Invalid lesson data",
                error: parsedbody.error
            });
        }

        
        const { courseId } = req.params;
        console.log(courseId)
        const { lessons } = parsedbody.data; 

        
        const updatedCourses = await courseModel.findByIdAndUpdate(
            courseId,
            { $push: { lessons: { $each: lessons } } },
            { new: true, useFindAndModify: false }
        );

        if (updatedCourses) {
            res.status(200).json({
                message: "Lesson added successfully",
                updatedCourses
            });
        } else {
            res.status(404).json({
                message: "Course not found"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

admincourse.put('/update',async function(req,res){
    try{
        const adminId = req.userId;
        const {title,description,imageUrl,price,courseId,category,difficulty,level,tags} = req.body;
        const courses = await courseModel.updateOne({
            _id:courseId,
            creatorId:adminId
        },{
            title:title,
            description:description,
            imageUrl:imageUrl,
            price:price,
            category:category,
            difficulty:difficulty,
            level:level,
            tags:tags
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

admincourse.get('/get',app,async function(req,res){
    try{
        const adminId = req.adminId;

        const courses = await courseModel.find({
           creatorId:adminId
        });
        if(courseModel){
           res.status(200).json({
               message:"Here are your courses",
               courses
   
           })
        }
       }catch(e){
          console.error(e)
       }
})

admincourse.get('/get/:courseId', app, async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await courseModel.findById(courseId);
        if (course) {
            return res.status(200).json({
                message: "Course retrieved successfully",
                course
            });
        } else {
            return res.status(404).json({
                message: "Course not found"
            });
        }
    } catch (e) {
        console.error("Error fetching course by ID:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});

admincourse.delete('/delete/:courseId', app, async function(req, res) {
    try {
        const adminId = req.adminId;
        const { courseId } = req.params;

        if (!adminId) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const courseDeletion = await courseModel.findByIdAndDelete({
            _id:courseId
        });
        
        

        if (courseDeletion) {
            return res.status(200).json({
                message: "Course deleted successfully",
                courseId
            });
        } else {
            return res.status(400).json({
                message: "Something went wrong in deletion"
            });
        }
    } catch (e) {
        console.error("Error deleting course:", e);
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports={
    admincourse:admincourse,
}