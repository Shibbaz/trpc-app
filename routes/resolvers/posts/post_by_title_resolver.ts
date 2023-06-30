import { Procedure } from '../../../libs/config/initializers/trpc';
import {throwError} from '../../../libs/helpers'
import { postByTitleResolverInput } from './resources/post_input'
import { Post } from '../../../models/posts/model'

export const postByTitleResolver = Procedure.input(
  postByTitleResolverInput
).output((value): any => {
    throwError
  }).query(async ({ input }:any) => {
    return new Post().find_by(input)

})
