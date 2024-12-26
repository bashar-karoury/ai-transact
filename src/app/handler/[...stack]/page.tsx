import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
// import { redirect } from "next/navigation";

export default async function Handler(props: HandlerProps) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
