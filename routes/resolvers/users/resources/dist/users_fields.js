"use strict";
exports.__esModule = true;
exports.postsInclude = void 0;
var zod_1 = require("zod");
exports.postsInclude = zod_1.z.object({
    id: zod_1.z.boolean({
        invalid_type_error: "do you want to expose id field?"
    })["default"](true),
    title: zod_1.z.boolean({
        invalid_type_error: "do you want to expose title field?"
    })["default"](true),
    description: zod_1.z.boolean({
        invalid_type_error: "do you want to expose description field?"
    })["default"](true),
    createAt: zod_1.z.boolean({
        invalid_type_error: "do you want to expose createAt field?"
    })["default"](true),
    updatedAt: zod_1.z.boolean({
        invalid_type_error: "do you want to expose createAt field?"
    })["default"](true)
});
