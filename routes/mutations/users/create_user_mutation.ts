import { Procedure } from '../../../libs/config/initializers/trpc';
import { EventEmitter } from 'events';
import { createUserInput } from './resources/inputs'
import { User } from '../../../models/users/model'
const ee = new EventEmitter();

export const createUserMutation = Procedure.input(createUserInput).mutation(async ({ input }:any) => {
            return new User().create(input)
        }
)