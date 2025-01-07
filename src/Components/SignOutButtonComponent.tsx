"use client";
import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
export default function SignOutButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push("/handler/sign-out")}>Sign Out</button>
  );
}
