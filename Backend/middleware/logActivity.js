const { ActivityLogModel } = require("../db");

async function logActivity(req,res,next){
     const userId = req.userId;
     const action = `${req.method} ${req.originalUrl}`;

     try{
       if(userId){
        await ActivityLogModel.create({
            userId,
            action,
            details:`User made a ${req.method} request to ${req.originalUrl}`,
        })
       }
     }catch(e){
        console.error('Error logging activity',err);
     }
     next();
}

module.exports ={
    logActivity
}