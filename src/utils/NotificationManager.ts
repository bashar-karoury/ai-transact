import { sendNotification as sendToNotfications } from "@/utils/newNotifications";
import { sendNotification as sendToNNN } from "@/utils/newNumberOfNotifications";
import { updateNotifications } from "@/utils/handler/functions";
export async function sendNotification(
  userEmail: string,
  newNotification: string
) {
  // increment and update nnn in database
  const notfs = await updateNotifications(userEmail, [newNotification]);
  // console.log("notfs=", notfs);
  const nnn = notfs?.length;
  sendToNNN(userEmail, JSON.stringify(nnn));
  sendToNotfications(userEmail, JSON.stringify(notfs));
}
