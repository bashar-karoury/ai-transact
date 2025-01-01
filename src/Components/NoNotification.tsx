"use client";
import { useEffect, useState } from "react";

export default function NoNotificationsComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/events");

    eventSource.onmessage = (event) => {
      setData(JSON.parse(event.data));
      console.log(data);
    };

    eventSource.onerror = () => {
      console.error("SSE error");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return <div>{JSON.stringify(data)}</div>;
}
