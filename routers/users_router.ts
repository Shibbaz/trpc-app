import { deleteUserMutation } from "../routes/mutations/users/delete_user_mutation"
import { updateUserMutation } from "../routes/mutations/users/update_user_mutation";
import { createUserMutation } from "../routes/mutations/users/create_user_mutation";
import { usersListResolver  } from "../routes/resolvers/users/users_list_resolver"
import { findUserByIdResolver } from "../routes/resolvers/users/find_user_by_id_resolver"
import { onUpdateUserSubscription } from "../routes/subscriptions/users/on_update_user_subscription"
import { router } from '../trpc';

export const usersRouter = router({
    usersList: usersListResolver,
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    onUpadateUser: onUpdateUserSubscription,
    findUserById: findUserByIdResolver,
    deleteUserById: deleteUserMutation
}
);