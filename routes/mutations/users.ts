import { publicProcedure } from '../../trpc';
import {date, z} from 'zod'
import { usersDataSource } from '../../models/users/dataSource'
import { EventEmitter } from 'events';

const ee = new EventEmitter();
export const createUserMutation = publicProcedure.input(
    z.object({
        text: z.string().nullish(),
    })
).mutation(({ input }:any) => {
    ee.emit('change', usersDataSource[0].name);
    usersDataSource[0].name=input.text

})