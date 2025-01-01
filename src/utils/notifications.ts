// Extend the global namespace to include the type definition
declare global {
  let activeUserClients: Map<string, ReadableStreamDefaultController<unknown>>;
}

// Initialize the global variable using `globalThis`
globalThis.activeUserClients =
  globalThis.activeUserClients ||
  new Map<string, ReadableStreamDefaultController<unknown>>();

export function addClient(
  userEmail: string,
  controller: ReadableStreamDefaultController<unknown>
) {
  if (!activeUserClients.has(userEmail)) {
    activeUserClients.set(userEmail, controller);
    console.log(activeUserClients.get(userEmail));
    console.log(`Added user : ${userEmail}`);
  }
  console.log(activeUserClients);
}

export function removeClient(userEmail: string) {
  activeUserClients.delete(userEmail);
}

export function sendNotification(userEmail: string, data: string) {
  console.log(activeUserClients);
  const clientController: ReadableStreamDefaultController<unknown> =
    activeUserClients.get(userEmail);
  console.log("found controller", clientController);
  if (!clientController) {
    console.log(`No clients connected for user: ${userEmail}`);
    return;
  }
  clientController.enqueue(`data: ${JSON.stringify(data)}\n\n`);
}
