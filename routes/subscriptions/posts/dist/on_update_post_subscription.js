"use strict";
exports.__esModule = true;
exports.onUpdatePostSubscription = void 0;
var observable_1 = require("@trpc/server/observable");
var trpc_1 = require("../../../trpc");
var zod_1 = require("zod");
var db_1 = require("../../../db");
exports.onUpdatePostSubscription = trpc_1.publicProcedure.use(trpc_1.loggerMiddleware).input(zod_1.z.object({
    id: zod_1.z.number().nullish()
})).subscription(function (_a) {
    var input = _a.input;
    return observable_1.observable(function (emit) {
        var post = db_1.prisma.post.findUnique({
            where: input
        });
        emit.next({ data: {
                id: input.id
            } });
    });
});
