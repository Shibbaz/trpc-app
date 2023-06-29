"use strict";
exports.__esModule = true;
exports.userRouter = void 0;
var users_1 = require("../routes/mutations/users");
var users_2 = require("../routes/resolvers/users");
var users_3 = require("../routes/subscriptions/users");
exports.userRouter = router({
    usersList: users_2.usersListResolver,
    createUser: users_1.createUserMutation,
    updateUser: users_1.updateUserMutation,
    onUpadateUser: users_3.onUpdateUserSubscription,
    userByName: users_2.userByNameResolver,
    deleteUserById: users_1.deleteUserMutation
});
