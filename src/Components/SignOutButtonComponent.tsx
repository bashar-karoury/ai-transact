"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import styles from "@/app/rootLayout.module.css";
export default function SignOutButton() {
  // const router = useRouter();
  const user = useUser();
  return (
    <button
      className={styles.signOutButton}
      onClick={() => {
        // router.push("/handler/sign-out");
        user.signOut();
      }}
    >
      Sign Out
    </button>
  );
}
