const {Router} = require('express');
const {courseModel} = require('../db');
const SearchRoute = Router();
const bodyParser = require('body-parser');
const { logActivity } = require('../middleware/logActivity');
SearchRoute.use(bodyParser.json()); 
SearchRoute.use(logActivity)
SearchRoute.get('/filter',async function(req,res){
    try{
        const{
            level,
            category,
            tags,
            minPrice,
            maxPrice,
            search,
            sortBy,
            order,
            page = 1,
            limit=10
        } = req.query;

        const query = {};

        if(level){
            query.level = level;
        }

        if(category){
            query.category = category;
        }

        if(tags){
            query.tags = {$in:tags.split(',')};
        }
        if (minPrice || maxPrice) {
            query.price = {}; 
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
              { title: { $regex: search, $options: 'i' } }, 
              { description: { $regex: search, $options: 'i' } }
            ];
        }

        let sortQuery ={};
        if(sortBy){
            sortQuery[sortBy]= order === 'desc' ? -1 :1;
        }

        const skip = (Number(page)-1)*Number(limit);

        const courses = await courseModel.find(query)
         .sort(sortQuery)
         .skip(skip)
         .limit(Number(limit));
        
        const totalcourses = await courseModel.countDocuments(query);
        
        res.status(200).json({
            message:"Courses fetched Successfully",
            totalcourses,
            page:Number(page),
            totalPages: Math.ceil(totalcourses / Number(limit)),
            courses
        })
    }catch(e){
        console.error(e);
        res.status(500).json({
            message:"Internal server Error"
        })
    }
})

module.exports ={
    SearchRoute
}