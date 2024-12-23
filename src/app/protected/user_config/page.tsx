import { stackServerApp } from "@/stack";

export default async function page() {
  const user = await stackServerApp.getUser();
  return (
    <>
      <h1>Configure {user?.primaryEmail}</h1>
    </>
  );
}
