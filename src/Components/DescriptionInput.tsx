"use client";
import { useEffect, useState } from "react";
import deduceCategoryFromDescription from "@/utils/categorization";
import styles from "@/app/(main)/dashboard/dashboard.module.css";
interface DoneAutoCategorizationProps {
  onFinishCategorization: (calculatedCategory: string) => void; // Prop type for the callback function
}

export default function DescriptionInput({
  onFinishCategorization,
  value,
  onChangeParent,
}) {
  const [description, setDescription] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [shouldCategorize, setShouldCategorize] = useState(false);

  function focusHanlder() {
    setIsFocused(true);
  }

  function blurHnalder() {
    if (isFocused) {
      setShouldCategorize(true);
      setIsFocused(false);
    }
  }

  async function checkEnter(event: { key: string }) {
    if (event.key === "Enter") {
      setShouldCategorize(true);
    }
  }

  useEffect(() => {
    async function CallCategorization() {
      try {
        // const result = await deduceCategoryFromDescription(description);
        const result = null;
        if (result) {
          onFinishCategorization(result);
        }
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    if (shouldCategorize) {
      CallCategorization();
      setShouldCategorize(false);
      setIsFocused(false);
    }
  }, [shouldCategorize]);
  return (
    <>
      <input
        type="text"
        name="description"
        placeholder="Transaction Description"
        className={styles.descriptionInput}
        value={value}
        onChange={(e) => {
          setDescription(e.target.value);
          onChangeParent(e);
        }}
        onFocus={focusHanlder}
        onBlur={blurHnalder}
        onKeyDown={checkEnter}
      ></input>
    </>
  );
}
