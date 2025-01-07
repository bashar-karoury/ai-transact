// Extend the global namespace to include the type definition
declare global {
  let activeUserClientsNNN: Map<
    string,
    ReadableStreamDefaultController<unknown>
  >;
}

// Initialize the global variable using `globalThis`
globalThis.activeUserClientsNNN =
  globalThis.activeUserClientsNNN ||
  new Map<string, ReadableStreamDefaultController<unknown>>();

export function addClient(
  userEmail: string,
  controller: ReadableStreamDefaultController<unknown>
) {
  if (!activeUserClientsNNN.has(userEmail)) {
    activeUserClientsNNN.set(userEmail, controller);
    // console.log(activeUserClients.get(userEmail));
    // console.log(`Added user : ${userEmail}`);
  }
  // console.log(activeUserClients);
}

export function removeClient(userEmail: string) {
  activeUserClientsNNN.delete(userEmail);
}

export function sendNotification(userEmail: string, data: number) {
  // console.log(activeUserClients);
  const clientController: ReadableStreamDefaultController<unknown> =
    activeUserClientsNNN.get(userEmail);
  // console.log("found controller", clientController);
  if (!clientController) {
    console.log(`No clients connected for user: ${userEmail}`);
    return;
  }
  clientController.enqueue(`data: ${JSON.stringify(data)}\n\n`);
}
