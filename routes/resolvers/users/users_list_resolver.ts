import { Procedure } from '../../../libs/config/initializers/trpc';
import {multipleUsersResolverInput} from "./resources/user_input"
import { User } from '../../../models/users/model'
import {throwError} from '../../../libs/helpers'
export const usersListResolver = Procedure.input(multipleUsersResolverInput).output((value) => {
  throwError(value)
}).query(async ({ input }) => {
  const users = new User()
  const query = await users.where(input);
  return query;
})