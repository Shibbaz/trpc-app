import { expect} from "@jest/globals"
import { appRouter, AppRouter } from "../router"
import { inferProcedureInput } from "@trpc/server"
import { mocked } from "jest-mock";
import { prisma } from "../db";
describe("create User Mutation", () => {
    const mockedPrismaService = mocked(prisma);
    const caller = appRouter.createCaller({session: null, prisma: mockedPrismaService});
    test("createUser", async() => {
        type Input = inferProcedureInput<AppRouter["createUser"]>
        const input: Input =  {
            name: "kamil",
            age: 24
        }
        const result = await caller.createUser(input)
        expect(result[0]["age"]).toBe(24)
        expect(result[0]["name"]).toBe("kamil")
        jest.clearAllMocks;
    })
})