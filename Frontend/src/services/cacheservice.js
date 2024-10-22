
const cache = new Map();

export const cacheService = {
    setCache: (key, value) => {
        cache.set(key, value);
    },

    getCache: (key) => {
        return cache.get(key);
    },

    clearCache: () => {
        cache.clear();
    },
};
