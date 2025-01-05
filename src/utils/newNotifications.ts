// Extend the global namespace to include the type definition
declare global {
  let activeUserClientsNotifications: Map<
    string,
    ReadableStreamDefaultController<unknown>
  >;
}

// Initialize the global variable using `globalThis`
globalThis.activeUserClientsNotifications =
  globalThis.activeUserClientsNotifications ||
  new Map<string, ReadableStreamDefaultController<unknown>>();

export function addClient(
  userEmail: string,
  controller: ReadableStreamDefaultController<unknown>
) {
  if (!activeUserClientsNotifications.has(userEmail)) {
    activeUserClientsNotifications.set(userEmail, controller);
    // console.log(activeUserClients.get(userEmail));
    // console.log(`Added user : ${userEmail}`);
  }
  // console.log(activeUserClients);
}

export function removeClient(userEmail: string) {
  activeUserClientsNotifications.delete(userEmail);
}

export function sendNotification(userEmail: string, data: string) {
  // console.log(activeUserClients);
  const clientController: ReadableStreamDefaultController<unknown> =
    activeUserClientsNotifications.get(userEmail);
  // console.log("found controller", clientController);
  if (!clientController) {
    console.log(`No clients connected for user: ${userEmail}`);
    return;
  }
  clientController.enqueue(`data: ${data}\n\n`);
}
