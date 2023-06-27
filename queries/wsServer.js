"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("@trpc/server/adapters/ws");
var ws_2 = require("ws");
var index_1 = require("./index");
var wss = new ws_2.default.Server({
    port: 3001,
});
var handler = (0, ws_1.applyWSSHandler)({ wss: wss, router: index_1.appRouter });
wss.on('connection', function (ws) {
    console.log("\u2795\u2795 Connection (".concat(wss.clients.size, ")"));
    ws.once('close', function () {
        console.log("\u2796\u2796 Connection (".concat(wss.clients.size, ")"));
    });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');
process.on('SIGTERM', function () {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
});
