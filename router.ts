import { router } from './trpc';
import { usersListResolver, userByNameResolver } from './routes/resolvers/users'
import { createUserMutation, updateUserMutation, deleteUserMutation } from './routes/mutations/users'
import { onUpdateUserSubscription } from './routes/subscriptions/users'

export const appRouter = router({
        usersList: usersListResolver,
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        onUpadateUser: onUpdateUserSubscription,
        userByName: userByNameResolver,
        deleteUserById: deleteUserMutation
    }
);

export type AppRouter = typeof appRouter;