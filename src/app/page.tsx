import { UserButton } from "@stackframe/stack";
import styles from "./page.module.css";
import SignInForm from "@/Components/AuthComponents/signInForm";
import SignUpForm from "@/Components/AuthComponents/SignUpForm";
import SignOutButton from "@/Components/AuthComponents/SignOutButton";
export default function Home() {
  return (
    <div className={styles.page}>
      <h1>HOME PAGE</h1>
      <UserButton />
      <br />
      <br />
      <br />
      <SignInForm />
      <br />
      <br />
      <br />
      <SignUpForm />
      <br />
      <br />
      <SignOutButton />
    </div>
  );
}
