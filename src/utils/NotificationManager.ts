import { sendNotification as sendToNotfications } from "@/utils/newNotifications";
import { sendNotification as sendToNNN } from "@/utils/newNumberOfNotifications";
import { updateNotifications } from "@/utils/handler/functions";
export async function sendNotification(
  userEmail: string,
  newNotification: string
) {
  // increment and update nnn from database
  const notfs = await updateNotifications(userEmail, [newNotification]);

  //   const { nnn, newNotificationsList } = result;

  // try to send to clients nnn and notification page if
  // they are connected (active)
  const nnn = notfs?.length;
  // const newNotificationList = [
  //   {
  //     id: 1,
  //     message: 'Notification One: You have a new transaction "Fast Food"',
  //     date: "Date",
  //   },
  //   {
  //     id: 2,
  //     message: 'Notification Two: You have a new transaction "Groceries"',
  //     date: "Date",
  //   },
  //   {
  //     id: 3,
  //     message: 'Notification Three: You have a new transaction "Gas"',
  //     date: "Date",
  //   },
  // ];
  sendToNNN(userEmail, JSON.stringify(nnn));
  sendToNotfications(userEmail, JSON.stringify(notfs));
}
