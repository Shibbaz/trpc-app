"use strict";
exports.__esModule = true;
exports.helloUserResolver = void 0;
var trpc_1 = require("../trpc");
var zod_1 = require("zod");
exports.helloUserResolver = trpc_1.publicProcedure.input(zod_1.z.object({
    text: zod_1.z.string().nullish()
})).query(function (_a) {
    var input = _a.input;
    return {
        text: "Hello " + input.text
    };
});
