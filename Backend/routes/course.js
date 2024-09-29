const {Router} = require('express');
const courseRoute = Router();
const {usermiddleware} = require('../middleware/usermiddleware');
const {purchaseModel,courseModel, userModel} = require('../db')

const { mockPayment } = require('../payemnt');
const {sendPurchaseEmail}=require('../emailservice/emailService');
const { logActivity } = require('../middleware/logActivity');

courseRoute.use(logActivity)

courseRoute.post('/purchase',usermiddleware,async function(req,res){
  try{
      const userId = req.userId;
    const {courseId,paymentMethod,amount} = req.body;
    const course = await courseModel.findById(courseId);
    if(!course){
        return res.status(404).json({message:"Course not found"});
    }
     const user = await userModel.findById(userId);
     if(!user){
        return res.status(404).json({message:"User not found"})
     }
     const PaymentResponse = await mockPayment(course.price);
    const purchase = await purchaseModel.create({
        userId:userId,
        courseId:courseId,
        transactionId:PaymentResponse.transactionId,
        amount: PaymentResponse.amount,
        paymentMethod:paymentMethod,
        status:"Completed"

    })

    if(purchase){
        await sendPurchaseEmail(user.email,course.title)
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