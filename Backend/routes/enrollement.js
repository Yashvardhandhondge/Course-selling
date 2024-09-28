const {Router} = require('express');
const Enrollementroutes = Router();
const {usermiddleware} = require('../middleware/usermiddleware');
const {purchaseModel, EnrollementModel} = require('../db');
const { app } = require('../middleware/adminmiddleware');

Enrollementroutes.post('/',usermiddleware,async function(req,res){
    try{
        const userId = req.userId;
        const courseId = req.body.courseId;
    
        let enrollment = await purchaseModel.findOne({
            userId:userId,
            courseId:courseId
        })
    
        if(enrollment){
           return res.status(400).json({
                messsage:"You have already enrolled the course"
            })
        }
    
        const newEnrollement = await purchaseModel.create({
            courseId,
            userId
        })
        // await newEnrollement.save()
    
        if(newEnrollement){
         return   res.status(201).json({
                messsage:"Enrollement saved successfully",
                enrollment:newEnrollement
            })
        }
    }catch(e){
         console.error(e)
    }
})


Enrollementroutes.put('/progress',usermiddleware,async function(req,res){
    const userId = req.userId
    const {courseId,lessonId} = req.body;
    
    try{
         let enrollment = await EnrollementModel.findOne({userId,courseId});

         if(!enrollment){
            return res.status(404).json({
                messsage:"Enrollment not found"
            })
         }
         if(!enrollment.lessonsCompleted.includes(lessonId)){
            enrollment.lessonsCompleted.push(lessonId);
            enrollment.progress = (enrollment.lessonsCompleted.length/10)*100
         }

         await enrollment.save();

         res.status(200).json({ message: "Progress updated", progress: enrollment.progress });
    }catch(e){
        res.status(500).json({ message: error.message });
    }


})


Enrollementroutes.put("/complete",usermiddleware,async function(req,res){
    const userId = req.userId;
    const{courseId} = req.body;

    try{
        let enrollment = await EnrollementModel.findOne({userId,courseId});
        if(!enrollment){
            return res.status(400).json({
                message:"Enrollment not found"
            })
        }
        enrollment.progress = 100;
        enrollment.completedAt = new Date();

        await enrollment.save();
        res.status(200).json({ message: "Course completed", enrollment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports ={
    Enrollementroutes
}