import { createHTTPServer } from '@trpc/server/adapters/standalone';
import * as trpc from '@trpc/server';
import { publicProcedure, router } from './trpc';
import {z} from 'zod'
import { EventEmitter } from 'events';
import { observable } from '@trpc/server/observable';

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
        users[0].name=input.text
        ee.emit('change', users[0]);

    }),
    onUpadateUser: publicProcedure.subscription(()=> {
        return observable<JSON>((emit) => {
            const onChange = (data: JSON) => {
                emit.next(data);
            }
            ee.on('change', onChange);
            return () => {
                ee.off('change', onChange);
              };
        })
    })


    }
);

export type AppRouter = typeof appRouter;
const server = createHTTPServer({
    router: appRouter,
  });
   
console.log("Server on")
