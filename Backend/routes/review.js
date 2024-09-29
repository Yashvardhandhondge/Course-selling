const {Router} = require('express');
const {ReviewModel,courseModel} = require('../db');
const reviewsRoute = Router();
const { usermiddleware } = require('../middleware/usermiddleware')
const {mongoose} = require('mongoose');
const { logActivity } = require('../middleware/logActivity');
reviewsRoute.use(logActivity)
reviewsRoute.post('/add',usermiddleware,async function(req,res){
    const userId = req.userId;
    const {courseId,rating,comment} = req.body;
    try{
    const existingreview = await ReviewModel.findOne({courseId,userId});

    if(existingreview){
        return res.status(400).json({message:"You have already reviewed this course"})
    }

    const newreview = await ReviewModel.create({
        courseId,userId,rating,comment
    })
    const course = await courseModel.findById(courseId);
    course.reviews.push(newreview._id);

    const totalReviews = course.reviews.length;
    course.averageRating = (course.averageRating*(totalReviews-1)+rating)/totalReviews;
    await course.save();
    res.status(200).json({message:"Review added Successfully",newreview});
    }catch(e){
      console.error(e);
      res.status(500).json({message:'Error adding a review'});
    }
})

reviewsRoute.get('/course/:courseId',async function(req,res){
    const courseId =req.params.courseId;
    try{
        const review = await ReviewModel.find({courseId}).populate('userId','firstname lastname image');
        res.status(200).json({review});
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Error fetching review"})
    }
})


module.exports ={
    reviewsRoute
}
