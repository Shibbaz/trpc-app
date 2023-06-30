"use strict";
exports.__esModule = true;
exports.Procedure = exports.router = exports.middleware = exports.t = void 0;
var server_1 = require("@trpc/server");
var superjson_1 = require("superjson");
exports.t = server_1.initTRPC.create({
    transformer: superjson_1["default"]
});
exports.middleware = exports.t.middleware;
exports.router = exports.t.router;
var logger_middleware_1 = require("../middlewares/logger_middleware");
exports.Procedure = exports.t.procedure.use(logger_middleware_1.loggerMiddleware);
