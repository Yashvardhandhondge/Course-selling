const {Router} = require('express');
const Enrollementroutes = Router();
const {usermiddleware} = require('../middleware/usermiddleware');
const {purchaseModel} = require('../db');

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

Enrollementroutes.put("/Update",async function(req,res){
    
})


module.exports ={
    Enrollementroutes
}