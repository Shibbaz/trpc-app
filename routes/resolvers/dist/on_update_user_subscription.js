"use strict";
exports.__esModule = true;
exports.onUpdateUserSubscription = void 0;
var observable_1 = require("@trpc/server/observable");
var trpc_1 = require("../../trpc");
var user_data_source_1 = require("../../user_data_source");
var zod_1 = require("zod");
exports.onUpdateUserSubscription = trpc_1.publicProcedure.input(zod_1.z.object({
    id: zod_1.z.number().nullish()
})).subscription(function (_a) {
    var input = _a.input;
    return observable_1.observable(function (emit) {
        var id = input.id;
        emit.next({ data: {
                name: user_data_source_1.users[id].name
            } });
    });
});
