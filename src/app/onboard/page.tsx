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

  return (
    <>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
        onClick={async () => {
          await user?.update({
            clientMetadata: {
              onboarded: true,
              address,
            },
          });
          router.push("/");
        }}
      >
        Submit
      </button>
    </>
  );
}
