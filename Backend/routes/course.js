const {Router} = require('express');
const courseRoute = Router();
const {usermiddleware} = require('../middleware/usermiddleware');
const {purchaseModel,courseModel} = require('../db')
const { v4: uuidv4 } = require('uuid');



courseRoute.post('/purchase',usermiddleware,async function(req,res){
  try{
      const userId = req.userId;
    const {courseId,paymentMethod} = req.body;
     const transactionId = uuidv4();
    const purchase = await purchaseModel.create({
        userId:userId,
        courseId:courseId,
        transactionId:transactionId,
        paymentMethod:paymentMethod,
        status:"Pending"

    })

    if(purchase){
        res.status(200).json({
            message:"You have purchsed the course successfully",
            purchase,
            _id:purchase
        })
    }else{
        res.status(404).json({
            message:"Something error occured "
        })
    }
  }catch(e){
  console.error(e)
  }
})

courseRoute.get('/getcourse',usermiddleware,async function(req,res){
    try{
       
       
       const courses = await courseModel.find({});

       if(courses){
        res.status(200).json({
            message:"These are your course",
            courses
        })
       }

    }catch(e){
        console.error(e)
    }
})

module.exports = {
    courseRoute : courseRoute
}