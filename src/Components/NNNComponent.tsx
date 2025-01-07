"use client";
import { useEffect, useState } from "react";

export default function NewNotificationsNumberComponent() {
  const [data, setData] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("/api/nnn-events");
    eventSource.onmessage = (event) => {
      console.log("nnn receieved", event);
      const received = event.data;
      console.log("receieved", received);
      if (received === "0") {
        console.log("is zero");
        setData("");
      } else {
        setData(JSON.parse(event.data));
      }
      console.log(`receieved data[${data}]`);
    };
    eventSource.onerror = (event) => {
      console.error("SSE error occurred:", event);
      // Close the connection to avoid further errors
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return <div>{data}</div>;
}
