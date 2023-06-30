"use strict";
exports.__esModule = true;
exports.cacheMiddleware = void 0;
var createPrismaRedisCache = require("prisma-redis-middleware").createPrismaRedisCache;
var ioredis_1 = require("ioredis");
var redis = new ioredis_1["default"](); // Uses default options for Redis connection
exports.cacheMiddleware = createPrismaRedisCache({
    models: [
        { model: "User", cacheTime: 60, cacheKey: "users", log: console },
    ],
    storage: {
        type: "redis",
        options: { client: redis, invalidation: {
                referencesTTL: 60
            }, log: console }
    },
    cacheTime: 300,
    onHit: function (key) {
        console.log("hit", key);
    },
    onMiss: function (key) {
        console.log("miss", key);
    },
    onError: function (key) {
        console.log("error", key);
    }
});
