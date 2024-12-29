import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
// import { redirect } from "next/navigation";
export default async function Handler(props: unknown) {
  // const search_params = await props.searchParams;
  // console.log(search_params);
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
