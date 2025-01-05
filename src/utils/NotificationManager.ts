import { sendNotification as sendToNotfications } from "@/utils/newNotifications";
import { sendNotification as sendToNNN } from "@/utils/newNumberOfNotifications";
export function sendNotification(userEmail: string, newNotification: string) {
  // increment and update nnn from database
  //   const result = await upateNotification(userEmail, newNotification);
  //   const { nnn, newNotificationsList } = result;

  // try to send to clients nnn and notification page if
  // they are connected (active)
  const nnn = 4;
  const newNotificationList = [
    {
      id: 1,
      message: 'Notification One: You have a new transaction "Fast Food"',
      date: "Date",
    },
    {
      id: 2,
      message: 'Notification Two: You have a new transaction "Groceries"',
      date: "Date",
    },
    {
      id: 3,
      message: 'Notification Three: You have a new transaction "Gas"',
      date: "Date",
    },
  ];
  sendToNNN(userEmail, JSON.stringify(nnn));
  sendToNotfications(userEmail, JSON.stringify(newNotificationList));
}

// async function upateNotification(userEmail: string, newNotification:string){
//     // nnn = incremant current and return it from db
//     // newNotificationList = add newNotification to list of notificaions and return current list
//     //return result as {nnn, newNotificationList};
// }
