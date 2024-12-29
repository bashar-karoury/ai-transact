"use client";
import { useEffect, useState } from "react";

export default function NoNotificationsComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/notifyNo", {
        cache: "no-store",
      });
      console.log(response);
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}
