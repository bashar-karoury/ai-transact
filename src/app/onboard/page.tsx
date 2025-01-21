"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import styles from "./onboardStyles.css";
import styles from "./onboardStyles.module.css";

type CurrentUser = {
  clientMetadata: { onboarded: boolean };
  update: (params: {
    clientMetadata: { onboarded: boolean; address: string };
  }) => Promise<void>;
};

export default function Onboard() {
  const user = useUser() as CurrentUser | null;
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    currency: "USD",
    logo: null,
  });
  useEffect(() => {
    // if (user?.clientMetadata?.onboarded) {
    //   router.push("/");
    // }
  }, [user, router]);

  // if (user?.clientMetadata?.onboarded) {
  //   return <></>;
  // }
  // should add all required fields for new users
  const clickHandler = async () => {
    try {
      await user?.update({
        clientMetadata: {
          onboarded: true,
          address,
        },
      });
      const email = user?.primaryEmail;
      const userConfigs = { email, balance: 0, ...formData };
      console.log(userConfigs);
      const result = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userConfigs),
      });
      console.log("result of adding user =", result);
    } catch (error) {
      console.error(`Failed to add user to database ${error}`);
    }
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.onboardCard}>
        {/* <div className="onboard-container"> */}
        <h1 className={styles.title}>Welcome to Ai-Transact</h1>
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
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}
