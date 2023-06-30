"use strict";
exports.__esModule = true;
exports.onUpdateUserSubscription = void 0;
var observable_1 = require("@trpc/server/observable");
var trpc_1 = require("../../../trpc");
var zod_1 = require("zod");
var database_1 = require("../../../libs/initializers/database");
exports.onUpdateUserSubscription = trpc_1.Procedure.input(zod_1.z.object({
    id: zod_1.z.number().nullish()
})).subscription(function (_a) {
    var input = _a.input;
    return observable_1.observable(function (emit) {
        var user = database_1.prisma.user.findUnique({
            where: input
        });
        emit.next({ data: {
                name: input.id
            } });
    });
});
