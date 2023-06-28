"use strict";
exports.__esModule = true;
exports.onUpdateUserSubscription = void 0;
var observable_1 = require("@trpc/server/observable");
var trpc_1 = require("../../trpc");
var zod_1 = require("zod");
var db_1 = require("../../db");
exports.onUpdateUserSubscription = trpc_1.publicProcedure.use(trpc_1.loggerMiddleware).input(zod_1.z.object({
    id: zod_1.z.number().nullish()
})).subscription(function (_a) {
    var input = _a.input;
    return observable_1.observable(function (emit) {
        var user = db_1.prisma.user.findUnique({
            where: input
        });
        emit.next({ data: {
                name: input.id
            } });
    });
});
