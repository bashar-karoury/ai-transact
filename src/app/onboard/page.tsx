"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type CurrentUser = {
  clientMetadata: { onboarded: boolean };
  update: (params: {
    clientMetadata: { onboarded: boolean; address: string };
  }) => Promise<void>;
};

export default function OnboardingPage() {
  const user = useUser() as CurrentUser | null;
  const router = useRouter();
  const [address, setAddress] = useState("");
  useEffect(() => {
    if (user?.clientMetadata?.onboarded) {
      router.push("/");
    }
  }, [user, router]);

  if (user?.clientMetadata?.onboarded) {
    return <></>;
  }
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
      const result = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, balance: 0 }),
      });
      console.log("result of adding user =", result);
    } catch (error) {
      console.error(`Failed to add user to database ${error}`);
    }
    router.push("/dashboard");
  };

  return (
    <>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={clickHandler}>Submit</button>
    </>
  );
}
