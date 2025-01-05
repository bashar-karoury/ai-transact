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

    eventSource.onerror = () => {
      console.error("SSE error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return <div>{data}</div>;
}
