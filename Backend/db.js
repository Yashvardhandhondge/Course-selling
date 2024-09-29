const mongoose = require('mongoose');


const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
    email: { type: String, index: true, unique: true },
    password: String,
    firstname: String,
    lastname: String,
    image: String
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
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



const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: { type: Number },
    imageUrl: String,
    creatorId: { type: ObjectId, ref: 'admin' },  
    category: String,
    difficulty: String,
    lessons: [lessonSchema],
    level:{type:String,enum:['Beginner','Intermediate','Advanced']},
    tags:[String],   
    reviews:[{type:ObjectId,ref:'Review'}],
    averageRating:{type:Number,default:0}                
}, { timestamps: true });


const purchaseSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'user' },  
    courseId: { type: ObjectId, ref: 'course' },  
    amount:Number,
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

const wishlistSchema = new mongoose.Schema({
    userId:{type:ObjectId,ref:'user'},
    courses:{type:ObjectId,ref:'course'}
})

const ReviewSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });

const notificationSchema = new mongoose.Schema({
    userId:{type:ObjectId,ref:'user'},
    message:String,
    isRead:{type:Boolean},
    createdAt:{type:Date,default:Date.now},
})  

const ActivityLogSchema = new mongoose.Schema({
    userId:{type:ObjectId,ref:'user'},
    action:{type:String,required:true},
    details:{type:String},
    timestamp:{type:Date,default:Date.now}
})

const ActivityLogModel = mongoose.model('Activity',ActivityLogSchema);
const notificationModel = mongoose.model('Notification',notificationSchema);
const WishlistModel = mongoose.model('Wishlist',wishlistSchema);
const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);
const EnrollementModel = mongoose.model('Enrollement',enrollmentSchema);
const ReviewModel = mongoose.model('Review',ReviewSchema)
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel,
    EnrollementModel,
    WishlistModel,
    ReviewModel,
    notificationModel,
    ActivityLogModel
};
