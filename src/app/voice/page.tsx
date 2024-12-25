"use client";

import RecordTransactionButton from "@/Components/RecordTransactionButton";

export default function Page() {
  const handleTransactionRecorded = (url: string) => {
    console.log("Transaction recorded:", url);
  };
  return (
    <RecordTransactionButton
      onTransactionRecorded={handleTransactionRecorded}
    />
  );
}
