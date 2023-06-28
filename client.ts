import { createTRPCProxyClient, httpBatchLink, createWSClient, wsLink, loggerLink, splitLink } from '@trpc/client';
import type { AppRouter } from './index';
import ws from 'ws';
globalThis.WebSocket = ws as any;
const wsClient = createWSClient({
  url: `ws://localhost:3000`,
});
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    // call subscriptions through websockets and the rest over http
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
    const userList = await trpc.usersList.query()
    console.log(userList)
    const createUserMutation = await trpc.createUser.mutate({name: "Shibbaz", age: 24})
    const changeUser = await trpc.updateUser.mutate({id: 1, name: "Kamil"})
    await new Promise<void>((resolve) => {
      const subscription = trpc.onUpadateUser.subscribe({id: 1}, {
        onData(data): void {
          console.log("Updated ", data)
        },
        onError(err) {
          console.error('Subscription error:', err);
        },
      }
      )
    })
    const deleteUserMutation = await trpc.deleteUserById.mutate({id: 1})
    wsClient.close();

}

main().catch(console.error)