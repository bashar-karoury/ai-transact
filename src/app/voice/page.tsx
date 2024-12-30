"use client";

import RecordTransactionButton from "@/Components/RecordTransactionButton";
import { useState } from "react";

export default function Page() {
  const [newTransaction, setNewTransaction] = useState<object | null>(null);
  const handleTransactionRecorded = (newTransaction: object) => {
    console.log("Transaction recorded:", newTransaction);
    setNewTransaction(newTransaction);
    // fill new transaction fields with the new transaction
    // to do ...
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
