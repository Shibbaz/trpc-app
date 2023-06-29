"use strict";
exports.__esModule = true;
exports.usersRouter = void 0;
var delete_user_mutation_1 = require("../routes/mutations/users/delete_user_mutation");
var update_user_mutation_1 = require("../routes/mutations/users/update_user_mutation");
var create_user_mutation_1 = require("../routes/mutations/users/create_user_mutation");
var users_list_resolver_1 = require("../routes/resolvers/users/users_list_resolver");
var find_user_by_id_resolver_1 = require("../routes/resolvers/users/find_user_by_id_resolver");
var on_update_user_subscription_1 = require("../routes/subscriptions/users/on_update_user_subscription");
var trpc_1 = require("../trpc");
exports.usersRouter = trpc_1.router({
    usersList: users_list_resolver_1.usersListResolver,
    createUser: create_user_mutation_1.createUserMutation,
    updateUser: update_user_mutation_1.updateUserMutation,
    onUpadateUser: on_update_user_subscription_1.onUpdateUserSubscription,
    findUserById: find_user_by_id_resolver_1.findUserByIdResolver,
    deleteUserById: delete_user_mutation_1.deleteUserMutation
});
