import { Procedure } from '../../../libs/config/initializers/trpc';
import { EventEmitter } from 'events';
import { User } from '../../../models/users/model';
import {deleteUserInput } from './resources/inputs'

const ee = new EventEmitter();

export const deleteUserMutation = Procedure.input(deleteUserInput).mutation(async({ input }:any) => {
    return new User().destroy(input)
})
