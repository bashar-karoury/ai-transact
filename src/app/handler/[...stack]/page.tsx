import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
// import { redirect } from "next/navigation";
interface HandlerProps {
  searchParams: URLSearchParams;
}

export default async function Handler(props: HandlerProps) {
  const search_params = await props.searchParams;
  console.log(search_params);
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
