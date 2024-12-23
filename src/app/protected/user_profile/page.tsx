import { stackServerApp } from "@/stack";

export default async function page() {
  const user = await stackServerApp.getUser();
  return (
    <>
      <h1>Hello {user?.primaryEmail}</h1>
    </>
  );
}
