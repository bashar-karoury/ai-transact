"use client";
import { useState } from "react";
import styles from "./settingsStyles.module.css";
import { useErrorModal } from "@/Components/ModalContext";
export default function Settings() {
  const { showErrorModal, showStatusModal } = useErrorModal();
  const [formData, setFormData] = useState({
    currency: "USD",
    logo: null,
  });
  const clickHandler = async () => {
    try {
      const userConfigs = formData;
      console.log(userConfigs);
      const result = await fetch("/api/userSettings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userConfigs),
      });
      if (!result.ok) {
        throw new Error("response status code not 200");
      }
      showStatusModel("User settings updated successfully");
      console.log("result of editing user settings =", result);
    } catch (error) {
      // console.error(`Failed to put user settings to database ${error}`);
      showErrorModal(`Failed to put user settings to database ${error}`);
    }
  };

  return (
    // className={styles.container}
    <div>
      <div className={styles.settingsCard}>
        <h1>Settings</h1>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Currency</label>
            <div className={styles.separator} />
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              className={styles.select}
            >
              <option value="USD" className={styles.option}>
                USD ($)
              </option>
              <option value="EUR" className={styles.option}>
                EUR (€)
              </option>
              <option value="GBP" className={styles.option}>
                GBP (£)
              </option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Logo</label>
            <div className={styles.separator} />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.files[0] })
              }
            />
          </div>

          <button
            type="button"
            onClick={clickHandler}
            className={styles.saveButton}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
