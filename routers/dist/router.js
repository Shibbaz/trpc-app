"use strict";
exports.__esModule = true;
exports.appRouter = void 0;
var trpc_1 = require("../trpc");
var users_router_1 = require("./users_router");
exports.appRouter = trpc_1.router({
    users: users_router_1.usersRouter
});
