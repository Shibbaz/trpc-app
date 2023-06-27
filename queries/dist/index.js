"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const standalone_1 = require("@trpc/server/adapters/standalone");
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
const events_1 = require("events");
const observable_1 = require("@trpc/server/observable");
const users = [
    {
        name: "Kamil",
        age: 25
    }
];
const ee = new events_1.EventEmitter();
exports.appRouter = trpc_1.router({
    helloUser: trpc_1.publicProcedure.input(zod_1.z.object({
        text: zod_1.z.string().nullish(),
    })).query(({ input }) => {
        return {
            text: `Hello ${input.text}`
        };
    }),
    usersList: trpc_1.publicProcedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        return users;
    })),
    changeFirstUser: trpc_1.publicProcedure.input(zod_1.z.object({
        text: zod_1.z.string().nullish(),
    })).mutation(({ input }) => {
        users[0].name = input.text;
        ee.emit('change', users[0]);
    }),
    onUpadateUser: trpc_1.publicProcedure.subscription(() => {
        return observable_1.observable((emit) => {
            const onChange = (data) => {
                emit.next(data);
            };
            ee.on('change', onChange);
            return () => {
                ee.off('change', onChange);
            };
        });
    })
});
const server = standalone_1.createHTTPServer({
    router: exports.appRouter,
});
console.log("Server on");
