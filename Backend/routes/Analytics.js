const {Router} = require('express');
const { ActivityLogModel } = require('../db');
const { usermiddleware } = require('../middleware/usermiddleware');
const analyticsRoute = Router();

analyticsRoute.get('/most-viewed-corses',async function(req,res){
    try {
        const mostViewedCourses = await ActivityLogModel.aggregate([
          { $match: { action: 'viewed course' } },                
          { $group: { _id: '$details', count: { $sum: 1 } } },     
          { $sort: { count: -1 } },                                
          { $limit: 5 }                                            
        ]);
        res.status(200).json({ mostViewedCourses });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching analytics' });
      }
})

analyticsRoute.get('/user-activity',usermiddleware,async function(req,res){
     const userId = req.userId;
     try{
        const userLogs = await ActivityLogModel.find({userId}).sort({timestamp:-1});
        res.status(200).json({userLogs});
     }catch(e){
        console.error(e);
        res.status(500).json({message:'Error fetching user activity logs'})
     }
})
module.exports ={
  analyticsRoute
}