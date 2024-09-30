
const { Router } = require('express');
const courseRoute = Router();
const { usermiddleware } = require('../middleware/usermiddleware');
const { purchaseModel, courseModel, userModel } = require('../db');
const { cacheMiddleware } = require('../middleware/cachemiddleware');
const { mockPayment } = require('../payemnt');
const { sendPurchaseEmail } = require('../emailservice/emailService');
const { logActivity } = require('../middleware/logActivity');


courseRoute.use(logActivity);


courseRoute.post('/purchase', usermiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId, paymentMethod, amount } = req.body;
        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const PaymentResponse = await mockPayment(course.price);
        const purchase = await purchaseModel.create({
            userId: userId,
            courseId: courseId,
            transactionId: PaymentResponse.transactionId,
            amount: PaymentResponse.amount,
            paymentMethod: paymentMethod,
            status: "Completed"
        });

        if (purchase) {
            await sendPurchaseEmail(user.email, course.title);
            res.status(200).json({
                message: "You have purchased the course successfully",
                purchase,
                _id: purchase._id
            });
        } else {
            res.status(404).json({
                message: "An error occurred"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});


function initCourseRoute(client) {
    courseRoute.get('/getcourse', cacheMiddleware(client), usermiddleware, async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const courses = await courseModel.find().skip(skip).limit(parseInt(limit));
            const redisKey = `courses_page_${page}`;
            const totalCourses = await courseModel.countDocuments();

            
            client.setex(redisKey, 600, JSON.stringify(courses));

            if (courses) {
                res.status(200).json({
                    message: 'These are your courses',
                    courses,
                    totalCourses,
                    totalPages: Math.ceil(totalCourses / limit),
                    currentPage: page,
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Internal server error" });
        }
    });

    return courseRoute;
}

module.exports = {
    initCourseRoute,
    courseRoute,
};
