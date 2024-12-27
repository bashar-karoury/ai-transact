"use client";
import { useState } from "react";
import deduceCategoryFromDescription from "@/utils/categorization";
export default function Page() {
  const [description, setDescription] = useState("");

  async function CallCategorization() {
    const result = await deduceCategoryFromDescription(description);
    console.log(result);
  }
  return (
    <>
      <input
        type="text"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          console.log(description);
        }}
      ></input>
      <button onClick={CallCategorization}> categorize </button>
    </>
  );
}
