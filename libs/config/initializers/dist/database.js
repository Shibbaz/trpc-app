"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
var redis_1 = require("./redis");
exports.prisma.$use(redis_1.cacheMiddleware);
