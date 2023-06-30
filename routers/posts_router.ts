import { deletePostMutation} from "../routes/mutations/posts/delete_post_mutation"
import { createPostMutation } from "../routes/mutations/posts/create_post_mutation"
import { updatePostMutation } from "../routes/mutations/posts/update_post_mutation"
import { postByTitleResolver } from "../routes/resolvers/posts/post_by_title_resolver"
import { postsListResolver } from "../routes/resolvers/posts/posts_lists_resolver"
import { onUpdatePostSubscription } from "../routes/subscriptions/posts/on_update_post_subscription"
import { router } from '../libs/config/initializers/trpc';

export const postsRouter = router({
    postsList: postsListResolver,
    createPost: createPostMutation,
    updatePost: updatePostMutation,
    onUpadatePost: onUpdatePostSubscription,
    postByTitle: postByTitleResolver,
    deletePostById: deletePostMutation
}
);