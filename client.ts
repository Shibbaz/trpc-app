import { createTRPCProxyClient, httpBatchLink, createWSClient, wsLink, loggerLink, splitLink } from '@trpc/client';
import type { AppRouter } from './server';
import ws from 'ws';
import superjson from 'superjson';

globalThis.WebSocket = ws as any;
const wsClient = createWSClient({
  url: `ws://localhost:3000`,
});
const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    loggerLink(),
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: `http://localhost:3000`,
      }),
    }),
  ],
});
async function main(){
    const createUserMutation = await trpc.users.createUser.mutate({name: "Shibbaz", age: 30})
    const changeUser = await trpc.users.updateUser.mutate({id: 167, name: "Kamil"})
    console.log(changeUser)
    const user = await trpc.users.findUserById.query({id: 167,
      posts: {
        select:{
          id: true,
          title: false,
        },
        skip: 1,
        take: 10
    }})
    console.log(JSON.stringify(user));

    const post = await trpc.posts.createPost.mutate({
      title: "title",
      description: "XDDDDDDD",
      authorId: 167
    })
    const userWithPosts = await trpc.users.usersList.query({posts: {
      select:{
        id: true,
        title: false,
      },
      skip: 1,
      take: 10
  }})

    console.log(userWithPosts);
    const subscription = await new Promise<void>((resolve) => {
      const subscription = trpc.users.onUpadateUser.subscribe({id: 167}, {
        onData(data): void {
          console.log("Updated ", data)
        },
        onError(err) {
          console.error('Subscription error:', err);
        },
      }
      )
    })
    wsClient.close();

}

main().catch(console.error)