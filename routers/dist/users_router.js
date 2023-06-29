"use strict";
exports.__esModule = true;
exports.usersRouter = void 0;
var users_1 = require("../routes/mutations/users");
var users_2 = require("../routes/resolvers/users");
var users_3 = require("../routes/subscriptions/users");
var trpc_1 = require("../trpc");
exports.usersRouter = trpc_1.router({
    usersList: users_2.usersListResolver,
    createUser: users_1.createUserMutation,
    updateUser: users_1.updateUserMutation,
    onUpadateUser: users_3.onUpdateUserSubscription,
    userByName: users_2.userByNameResolver,
    deleteUserById: users_1.deleteUserMutation
});
