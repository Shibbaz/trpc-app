"use strict";
exports.__esModule = true;
exports.deleteUserInput = exports.createUserInput = void 0;
var zod_1 = require("zod");
exports.createUserInput = zod_1.z.object({
    name: zod_1.z.string().nullish(),
    age: zod_1.z.number().nullish()
});
exports.deleteUserInput = zod_1.z.object({
    id: zod_1.z.number()
});
