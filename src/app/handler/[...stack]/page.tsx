import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
// import { redirect } from "next/navigation";
// @ts-ignore
export default async function Handler(props: {
  params: unknown;
  searchParams: unknown;
}) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
