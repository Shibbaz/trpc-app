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
var count = 0;
async function main(){
    const changeUser = await trpc.changeFirstUser.mutate({text: "Shibbaz"})
    await new Promise<void>((resolve) => {
      const subscription = trpc.onUpadateUser.subscribe({id: 0}, {
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