"use strict";
exports.__esModule = true;
exports.postListResolverInput = exports.postByTitleResolverInput = void 0;
var zod_1 = require("zod");
exports.postByTitleResolverInput = zod_1.z.object({
    title: zod_1.z.string().nullish()
});
exports.postListResolverInput = zod_1.z.object({
    pagination: zod_1.z.object({
        page: zod_1.z.number().nullish(),
        limit: zod_1.z.number().nullish()
    })
});
