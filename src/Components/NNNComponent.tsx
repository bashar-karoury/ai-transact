"use client";
import { useEffect, useState } from "react";

export default function NewNotificationsNumberComponent() {
  const [data, setData] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("/api/nnn-events");

    eventSource.onmessage = (event) => {
      console.log("nnn receieved", event);
      setData(JSON.parse(event.data));
      console.log("receieved data", data);
    };

    eventSource.onerror = (event) => {
      console.error("SSE error occurred:", event);
      // Optionally inspect specific properties of the event object
      if (event?.target?.readyState === EventSource.CLOSED) {
        console.error("The connection was closed.");
      }
      // Close the connection to avoid further errors
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return <div>{data}</div>;
}
