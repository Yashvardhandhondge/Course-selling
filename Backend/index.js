const express = require('express');
const mongoose = require('mongoose');
const { createClient } = require('redis');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 3000;


const MONGO_URL = process.env.MONGO_URL;


const client = createClient({
    password: 'e89Wgpnrlqn7RPw2OqLbSW87S7jCzU7j',
    socket: {
        host: 'redis-14964.c322.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 14964
    }
});


client.connect()
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch((err) => {
        console.error('Redis connection error:', err);
    });
console.log(process.env.API_KEY)

const { adminRouter } = require('./routes/admin');
const { userRouter } = require('./routes/user');
const { courseRoute, initCourseRoute } = require('./routes/course');
const { Enrollementroutes } = require('./routes/enrollement');
const { SearchRoute } = require('./routes/Search');
const { WishlistRoute } = require('./routes/Wishlist');
const { reviewsRoute } = require('./routes/review');
const {router} = require('./routes/Chatbot')
app.use('/chatbot',router)
app.use('/review', reviewsRoute);
app.use('/search', SearchRoute);
app.use('/wishlist', WishlistRoute);
app.use('/enroll', Enrollementroutes);
app.use('/', initCourseRoute(client));
app.use('/get',courseRoute)
app.use('/user', userRouter);
app.use('/admin', adminRouter);


async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected");
    } catch (e) {
        console.error('MongoDB connection error:', e);
    }
}

main();

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

module.exports = {
    client
};
