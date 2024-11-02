const { Router } = require('express');
const { WishlistModel, courseModel, purchaseModel } = require('../db');
const { usermiddleware } = require('../middleware/usermiddleware');
const { logActivity } = require('../middleware/logActivity');

const WishlistRoute = Router();
WishlistRoute.use(logActivity);


WishlistRoute.post('/add', usermiddleware, async function(req, res) {
  const userId = req.userId;
  const { courseId } = req.body;
  try {
    let wishlist = await WishlistModel.findOne({ userId });

    if (!wishlist) {
      wishlist = await WishlistModel.create({ userId: userId, courses: [courseId] });
    } else {
      if (!wishlist.courses.includes(courseId)) {
        wishlist.courses.push(courseId);
        await wishlist.save();
      }
    }

    res.status(200).json({
      message: "Course added to wishlist",
      wishlist
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error adding course to wishlist' });
  }
});


WishlistRoute.get("/:userId", usermiddleware, async function(req, res) {
  const userId = req.userId;

  try {
    const wishlist = await WishlistModel.findOne({ userId }).populate('courses');
    res.status(200).json({ wishlist });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});


WishlistRoute.get('/recommendations/:userId', usermiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const purchases = await purchaseModel.find({ userId }).populate('courseId');
    const purchasedCourseCategories = purchases.map(purchase => purchase.courseId.category);

    const recommendations = await courseModel.find({
      category: { $in: purchasedCourseCategories },
      _id: { $nin: purchases.map(p => p.courseId._id) }
    });

    res.status(200).json({ recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});


WishlistRoute.delete('/delete', usermiddleware, async function(req, res) {
  const userId = req.userId;
  const { courseId } = req.body;

  try {
    const wishlist = await WishlistModel.findOne({ userId });

    if (wishlist) {
      wishlist.courses = wishlist.courses.filter(id => id.toString() !== courseId); // Filter out course by ID
      await wishlist.save();
      res.status(200).json({ message: "Course removed from wishlist", courseId });
    } else {
      res.status(404).json({ message: "Wishlist not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error removing course from wishlist" });
  }
});

module.exports = { WishlistRoute };
