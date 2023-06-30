import { Procedure } from '../../../libs/config/initializers/trpc';
import { EventEmitter } from 'events';
import { updatePostInput } from './resources/inputs';
import { Post } from '../../../models/posts/model'
const ee = new EventEmitter();

export const updatePostMutation = Procedure.input(updatePostInput).mutation(async({ input }:any) => {
    ee.emit('change', {id: input.id});
    return new Post().update(input, {
        id: true,
        description: true,
        title: true
      })
})