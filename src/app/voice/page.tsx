"use client";

import RecordTransactionButton from "@/Components/RecordTransactionButton";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [newTransaction, setNewTransaction] = useState<object | null>(null);
  const handleTransactionRecorded = (newTransaction: object) => {
    console.log("Transaction recorded:", newTransaction);
    // fill new transaction fields with the new transaction
    setNewTransaction(newTransaction);
  };
  return (
    <>
      <RecordTransactionButton
        onTransactionRecorded={handleTransactionRecorded}
      />
      <p> {newTransaction && String(newTransaction)}</p>
    </>
  );
}
