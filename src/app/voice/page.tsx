"use client";

import RecordTransactionButton from "@/Components/RecordTransactionButton";

export default function Page() {
  const handleTransactionRecorded = (newTransaction: object) => {
    console.log("Transaction recorded:", newTransaction);
    // fill new transaction fields with the new transaction
  };
  return (
    <RecordTransactionButton
      onTransactionRecorded={handleTransactionRecorded}
    />
  );
}
