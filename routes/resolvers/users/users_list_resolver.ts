import { Procedure } from '../../../libs/config/initializers/trpc';
import {multipleUsersResolverInput} from "./resources/user_input"
import { User } from '../../../models/users/model'
import {throwError} from '../../../libs/helpers'
export const usersListResolver = Procedure.input(multipleUsersResolverInput).output((value): any => {
  throwError(value)
}).query(async ({ input }:any) => {
  const users = new User().where(input)
  return await users;
})