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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@trpc/client");
const ws_1 = __importDefault(require("ws"));
globalThis.WebSocket = ws_1.default;
const wsClient = client_1.createWSClient({
    url: `ws://localhost:4000`,
});
const trpc = client_1.createTRPCProxyClient({
    links: [
        client_1.wsLink({ client: wsClient })
    ],
});
var count = 0;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const userList = yield trpc.usersList.query();
        console.log("userList:", userList);
        const helloUser = yield trpc.helloUser.query({ text: 'kamil' });
        console.log("Hello message: ", helloUser);
        const changeUser = yield trpc.changeFirstUser.mutate({ text: "Shibbaz" });
        const updatedUserList = yield trpc.usersList.query();
        console.log("userList:", updatedUserList);
        const trpcsub = yield new Promise((resolve) => {
            const subscription = trpc.onUpadateUser.subscribe(undefined, {
                onData(data) {
                    console.log(data);
                }
            });
        });
        wsClient.close();
    });
}
main().catch(console.error);
