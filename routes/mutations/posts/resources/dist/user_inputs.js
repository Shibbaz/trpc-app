"use strict";
exports.__esModule = true;
exports.updatePostInput = exports.deletePostInput = exports.createPostInput = void 0;
var zod_1 = require("zod");
exports.createPostInput = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string().nullish(),
    authorId: zod_1.z.number()
});
exports.deletePostInput = zod_1.z.object({
    id: zod_1.z.number()
});
exports.updatePostInput = zod_1.z.object({
    id: zod_1.z.number(),
    title: zod_1.z.string().nullish(),
    description: zod_1.z.string().nullish()
});
