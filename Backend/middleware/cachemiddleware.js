
const cacheMiddleware = (client) => {
    return (req, res, next) => {
        const { page = 1 } = req.query;
        const redisKey = `courses_page_${page}`;

        client.get(redisKey, (err, data) => {
            if (err) {
                console.error('Redis error:', err);
                return next(); 
            }

            if (data) {
                return res.status(200).json(JSON.parse(data));
            } else {
                next(); 
            }
        });
    };
};

module.exports = {
    cacheMiddleware,
};
