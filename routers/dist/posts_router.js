"use strict";
exports.__esModule = true;
exports.postsRouter = void 0;
var delete_post_mutation_1 = require("../routes/mutations/posts/delete_post_mutation");
var create_post_mutation_1 = require("../routes/mutations/posts/create_post_mutation");
var update_post_mutation_1 = require("../routes/mutations/posts/update_post_mutation");
var post_by_title_resolver_1 = require("../routes/resolvers/posts/post_by_title_resolver");
var posts_lists_resolver_1 = require("../routes/resolvers/posts/posts_lists_resolver");
var on_update_post_subscription_1 = require("../routes/subscriptions/posts/on_update_post_subscription");
var trpc_1 = require("../trpc");
exports.postsRouter = trpc_1.router({
    postsList: posts_lists_resolver_1.postsListResolver,
    createPost: create_post_mutation_1.createPostMutation,
    updatePost: update_post_mutation_1.updatePostMutation,
    onUpadatePost: on_update_post_subscription_1.onUpdatePostSubscription,
    postByTitle: post_by_title_resolver_1.postByTitleResolver,
    deletePostById: delete_post_mutation_1.deletePostMutation
});
