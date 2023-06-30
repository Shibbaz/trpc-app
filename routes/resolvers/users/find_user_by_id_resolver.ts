import { Procedure } from '../../../libs/config/initializers/trpc';
import { singleUserResolverInput } from './resources/user_input'
import { User } from '../../../models/users/model'
import {throwError} from '../../../libs/helpers'
export const findUserByIdResolver = Procedure.input(singleUserResolverInput).output((value): any => {
  throwError(value)
}).query(async ({ input }:any) => {
  const user = new User().find(input)
  return await user;
})