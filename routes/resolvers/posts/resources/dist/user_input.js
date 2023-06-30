"use strict";
exports.__esModule = true;
exports.multipleUsersResolverInput = exports.singleUserResolverInput = void 0;
var zod_1 = require("zod");
var users_fields_1 = require("./users_fields");
exports.singleUserResolverInput = zod_1.z.object({
    id: zod_1.z.number({
        invalid_type_error: "id must be number"
    }).nullish(),
    posts: zod_1.z.object({
        select: users_fields_1.postsInclude.nullish(),
        skip: zod_1.z.number()["default"](0),
        take: zod_1.z.number()["default"](100000)
    }).nullish()
});
exports.multipleUsersResolverInput = zod_1.z.object({
    skip: zod_1.z.number()["default"](0),
    take: zod_1.z.number()["default"](100000),
    conditions: zod_1.z.object({
        id: zod_1.z.number({
            invalid_type_error: "id must be number"
        }).nullish(),
        name: zod_1.z.string({
            invalid_type_error: "name must be string"
        }).nullish()
    }).nullish(),
    posts: zod_1.z.object({
        select: users_fields_1.postsInclude.nullish(),
        skip: zod_1.z.number()["default"](0),
        take: zod_1.z.number()["default"](100000)
    }).nullish()
});
