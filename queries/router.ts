import * as trpc from '@trpc/server';
import { publicProcedure, router } from './trpc';
import {date, z} from 'zod'
import { EventEmitter } from 'events';
import { observable } from '@trpc/server/observable';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';

const user = z.object(
    { 
        name: z.string(), 
        age: z.number()
    }
)

const userType = typeof user;
const users = [
    {
        name: "Kamil",
        age: 25
    }
]
const ee = new EventEmitter();

export const appRouter = router({
    helloUser: publicProcedure.input(
        z.object({
          text: z.string().nullish(),
        })).query(({ input }) => {
            return {
                text: `Hello ${ input.text }`
            }
        }),
    usersList: publicProcedure.query(async() => {
        return users
    }),
    changeFirstUser: publicProcedure.input(
        z.object({
            text: z.string().nullish(),
        })
    ).mutation(({ input }:any) => {
        ee.emit('change', users[0].name);
        users[0].name=input.text

    }),
    onUpadateUser: publicProcedure.input(
        z.object({
            id: z.number().nullish(),
        })
    ).subscription(({input}:any)=> {
        return observable<{data: any}>((emit) => {
            const id = input.id
            emit.next({data: {
                name: users[id].name
            }});
        }
        )
    })


    }
);