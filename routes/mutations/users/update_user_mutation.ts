import { Procedure } from '../../../libs/config/initializers/trpc';
import { z} from 'zod'
import { EventEmitter } from 'events';
import { User } from '../../../models/users/model';

const ee = new EventEmitter();
export const updateUserMutation = Procedure.input(
    z.object({
        id: z.number(),
        name: z.string().nullish(),
        age: z.number().nullish()
    })
).mutation(async({ input }:any) => {
    ee.emit('change', {name: input.name});
    return new User().update(
        input,
        {
            age: true,
            name: true,
        }
    )

})