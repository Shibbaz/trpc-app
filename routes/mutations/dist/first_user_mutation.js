"use strict";
exports.__esModule = true;
exports.createUserMutation = void 0;
var trpc_1 = require("../../trpc");
var zod_1 = require("zod");
var user_data_source_1 = require("../../user_data_source");
var events_1 = require("events");
var ee = new events_1.EventEmitter();
exports.createUserMutation = trpc_1.publicProcedure.input(zod_1.z.object({
    text: zod_1.z.string().nullish()
})).mutation(function (_a) {
    var input = _a.input;
    ee.emit('change', user_data_source_1.users[0].name);
    user_data_source_1.users[0].name = input.text;
});
