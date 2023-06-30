import { Procedure } from '../../../libs/config/initializers/trpc';
import { EventEmitter } from 'events';
import { createPostInput } from './resources/inputs';
import { Post } from '../../../models/posts/model'

const ee = new EventEmitter();

export const createPostMutation = Procedure.input(createPostInput).mutation(async ({ input }:any) => {
        return new Post().create(input)
    }
)