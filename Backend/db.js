const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const user = new mongoose.Schema({
    email : {type:String,index:true},
    password : String,
    firstname : String,
    lastname : String,
    image:String
},{timestamps:true})

const admin =new mongoose.Schema({
    email:{type:String,index:true},
    password:String,
    firstname:String,
    lastname:String,
    image:String
},{timestamps:true})

const courseSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:{type:Number},
    imageUrl:String,
    creatorId:{type:ObjectId,ref:admin},
    category:String,
    difficulty:String
})

const purchase = new mongoose.Schema({
userId:{type:ObjectId,ref:user},
courseId : {type:ObjectId,ref:course},
transactionId:String,
paymentMethod:String,
status:{type:String,default:'pending'}
},{timestamps:true})

const usermodel = mongoose.model('user',user);
const adminmodel = mongoose.model('admin',admin);
const course = mongoose.model('course',courseSchema);
const purchasemodel = mongoose.model('purchase',purchase);

module.exports ={
    usermodel:usermodel,
    adminmodel : adminmodel,
    course : course,
    purchasemodel : purchasemodel
}
