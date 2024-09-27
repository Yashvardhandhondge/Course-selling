const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    email: { type: String, index: true, unique: true },
    password: String,
    firstname: String,
    lastname: String,
    image: String
}, { timestamps: true });


const lessonSchema = new mongoose.Schema({
    title: String,
    content: String,         
    videoUrl: String,       
    duration: Number         
}, { timestamps: true });


const adminSchema = new mongoose.Schema({
    email: { type: String, index: true, unique: true },
    password: String,
    firstname: String,
    lastname: String,
    image: String
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number },
    imageUrl: String,
    creatorId: { type: ObjectId, ref: 'admin' },  
    category: String,
    difficulty: String,
    lessons: [lessonSchema]                      
}, { timestamps: true });


const purchaseSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'user' },  
    courseId: { type: ObjectId, ref: 'course' },  
    transactionId: String,
    paymentMethod: String,
    status: { type: String, default: 'pending' }
}, { timestamps: true });


const enrollmentSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'user' },
    courseId: { type: ObjectId, ref: 'course' },
    progress: { type: Number, default: 0 },         
    completedAt: { type: Date },
    lessonsCompleted: [{ type: ObjectId }]         
}, { timestamps: true });


const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);
const EnrollementModel = mongoose.model('Enrollement',enrollmentSchema);
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
    EnrollementModel
};
