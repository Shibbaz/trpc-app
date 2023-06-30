import { Procedure } from '../../../libs/config/initializers/trpc';
import { postListResolverInput } from './resources/post_input'
import {throwError} from '../../../libs/helpers'
import { Post } from '../../../models/posts/model'
export const postsListResolver = Procedure.input(
  postListResolverInput
).output((value): any => {
  throwError
}).query(async({ input }) => {
  return new Post().where(input)
})
