import { router } from './trpc';
import { usersListResolver, userByNameResolver } from './routes/resolvers/users'
import { createUserMutation, updateUser } from './routes/mutations/users'
import { onUpdateUserSubscription } from './routes/subscriptions/users'

export const appRouter = router({
        usersList: usersListResolver,
        createUserMutation: createUserMutation,
        updateUser: updateUser,
        onUpadateUser: onUpdateUserSubscription,
        userByName: userByNameResolver
    }
);