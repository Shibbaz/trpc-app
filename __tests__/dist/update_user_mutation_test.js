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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var globals_1 = require("@jest/globals");
var app_router_1 = require("../routers/app_router");
var jest_mock_1 = require("jest-mock");
var db_1 = require("../db");
describe("update User Mutation", function () {
    var mockedPrismaService = jest_mock_1.mocked(db_1.prisma);
    var caller = app_router_1.appRouter.createCaller({ session: null, prisma: mockedPrismaService });
    globals_1.test("createUser", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createInput, createdUserResult, input, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createInput = {
                        name: "kamil",
                        age: 24
                    };
                    return [4 /*yield*/, caller.users.createUser(createInput)];
                case 1:
                    createdUserResult = _a.sent();
                    globals_1.expect(createdUserResult[0]["age"]).toBe(24);
                    globals_1.expect(createdUserResult[0]["name"]).toBe("kamil");
                    input = {
                        id: createdUserResult[0]["id"],
                        name: "shibbaz",
                        age: 24
                    };
                    return [4 /*yield*/, caller.users.updateUser(input)];
                case 2:
                    result = _a.sent();
                    globals_1.expect(result[0]["age"]).toBe(24);
                    globals_1.expect(result[0]["name"]).toBe("shibbaz");
                    jest.clearAllMocks;
                    return [2 /*return*/];
            }
        });
    }); });
});
