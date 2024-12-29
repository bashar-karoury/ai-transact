let noNotificationsNumber = 0;

const intervalHandler = setInterval(() => {
  noNotificationsNumber += 1;
  console.log("updating", noNotificationsNumber);
  if (noNotificationsNumber === 30) {
    clearInterval(intervalHandler);
  }
}, 5000);
export default async function getNotificationsNumber() {
  return noNotificationsNumber;
}
