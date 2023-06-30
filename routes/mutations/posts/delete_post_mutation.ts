import { Procedure } from '../../../libs/config/initializers/trpc';
import { EventEmitter } from 'events';
import { deletePostInput } from './resources/inputs'
const ee = new EventEmitter();
import { Post } from '../../../models/posts/model'

export const deletePostMutation = Procedure.input(deletePostInput).mutation(async({ input }:any) => {
    return new Post().destroy(input)

})
