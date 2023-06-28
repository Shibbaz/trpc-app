import {test, expect} from "@jest/globals"
import { appRouter, AppRouter } from "../router"
import { inferProcedureInput } from "@trpc/server"
import { mocked } from "jest-mock";
import { prisma } from "../db";

describe("delete User Mutation", () => {
    const mockedPrismaService = mocked(prisma);
    const caller = appRouter.createCaller({session: null, prisma: mockedPrismaService});
    test("deleteUser", async() => {
        type Input = inferProcedureInput<AppRouter["createUser"]>
        const input: Input =  {
            name: "kamil",
            age: 24
        }
        const createdUserResult = await caller.createUser(input)
        expect(createdUserResult[0]["age"]).toBe(24)
        expect(createdUserResult[0]["name"]).toBe("kamil")
        expect(createdUserResult.length).toBe(1) 

        type deleteInput = inferProcedureInput<AppRouter["deleteUserById"]>
        var id = createdUserResult[0]["id"];
        const delete_user_input: deleteInput =  {
            id: id
        }
        const user = await caller.deleteUserById(delete_user_input) 
        expect(user).not.toThrowError;
        jest.clearAllMocks;
    })
})