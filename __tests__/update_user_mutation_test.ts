import {test, expect} from "@jest/globals"
import { appRouter, AppRouter } from "../routers/app_router"
import { inferProcedureInput } from "@trpc/server"
import { mocked } from "jest-mock";
import { prisma } from "../db";

describe("update User Mutation", () => {
    const mockedPrismaService = mocked(prisma);
    const caller = appRouter.createCaller({session: null, prisma: mockedPrismaService});
    test("createUser", async() => {
        type createInput = inferProcedureInput<AppRouter["users"]["createUser"]>
        const createInput: createInput =  {
            name: "kamil",
            age: 24
        }
        const createdUserResult = await caller.users.createUser(createInput)
        expect(createdUserResult[0]["age"]).toBe(24)
        expect(createdUserResult[0]["name"]).toBe("kamil")

        type updateInput = inferProcedureInput<AppRouter["users"]["updateUser"]>
        const input: updateInput =  {
            id: createdUserResult[0]["id"],
            name: "shibbaz",
            age: 24
        }
        const result = await caller.users.updateUser(input)
        expect(result[0]["age"]).toBe(24)
        expect(result[0]["name"]).toBe("shibbaz")
        jest.clearAllMocks;
    })
})