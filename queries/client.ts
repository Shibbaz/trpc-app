import { createTRPCProxyClient, httpBatchLink, createWSClient, wsLink } from '@trpc/client';
import type { AppRouter } from './index';
import ws from 'ws';

globalThis.WebSocket = ws as any;
const wsClient = createWSClient({
  url: `ws://localhost:4000`,
});
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    wsLink<AppRouter>({ client: wsClient })],
});
var count = 0;
async function main(){
    const userList = await trpc.usersList.query()
    console.log("userList:", userList)
    const helloUser = await trpc.helloUser.query({ text: 'kamil' })
    console.log("Hello message: ", helloUser)
    const changeUser = await trpc.changeFirstUser.mutate({text: "Shibbaz"})
    const updatedUserList = await trpc.usersList.query()
    console.log("userList:", updatedUserList)
    const trpcsub = await new Promise<void>((resolve) => {
      const subscription = trpc.onUpadateUser.subscribe(undefined, {
        onData(data) {
          console.log(data);
      }})
      
    });
    wsClient.close();  
}

main().catch(console.error)