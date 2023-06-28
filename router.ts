import { router } from './trpc';
import { helloUserResolver, usersListResolver } from './routes/resolvers/users'
import { createUserMutation } from './routes/mutations/users'
import { onUpdateUserSubscription } from './routes/subscriptions/users'

export const appRouter = router({
        helloUser: helloUserResolver,
        usersList: usersListResolver,
        changeFirstUser: createUserMutation,
        onUpadateUser: onUpdateUserSubscription
    }
);