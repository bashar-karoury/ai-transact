"use client";
import DescriptionInput from "@/Components/DescriptionInput";
import { useState } from "react";

export default function Page() {
  const [category, setCategory] = useState("");
  function finishCategorization(output_category: string) {
    console.log("Finished Categorizing");
    setCategory(output_category);
  }
  return (
    <div>
      <DescriptionInput onFinishCategorization={finishCategorization} />
      <input
        type="text"
        value={category}
        onChange={() => console.log("second input value changed")}
      ></input>
    </div>
  );
}
