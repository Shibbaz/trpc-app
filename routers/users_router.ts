import { createUserMutation, updateUserMutation, deleteUserMutation } from "../routes/mutations/users"
import { usersListResolver, userByNameResolver  } from "../routes/resolvers/users"
import { onUpdateUserSubscription } from "../routes/subscriptions/users"
import { router } from '../trpc';

export const usersRouter = router({
    usersList: usersListResolver,
    createUser: createUserMutation,
    updateUser: updateUserMutation,
    onUpadateUser: onUpdateUserSubscription,
    userByName: userByNameResolver,
    deleteUserById: deleteUserMutation
}
);