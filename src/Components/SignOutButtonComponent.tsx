"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
export default function SignOutButton() {
  // const router = useRouter();
  const user = useUser();
  return (
    <button
      onClick={() => {
        // router.push("/handler/sign-out");
        user.signOut();
      }}
    >
      Sign Out
    </button>
  );
}
