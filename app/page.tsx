"use client";

import VerifyBtn from "@/components/button/Verify";
import { SignInBtn } from "@/components/button/SignIn";
import { useSignIn } from "@/hooks/useSignIn";
import HomeScreen from "@/components/screens/Home";
import BottomNav from "@/components/bottomNav";
export default function Home() {
  const { handleSignIn, handleSignOut, session, status } = useSignIn();
  if (status === "loading") {
    // While the session status is loading, show a loading spinner or message
    return (
      <main className="flex min-h-screen bg-white flex-col items-center justify-center p-24">
        <p>Loading...</p>
      </main>
    );
  }

  if (!session) {
    // If there is no session, prompt the user to sign in
    return (
      <main className="flex min-h-screen bg-white flex-col items-center justify-center p-24">
        <p>Please sign in to access the homepage</p>
        <SignInBtn />
      </main>
    );
  }

  // If the user is signed in, show the homepage
  return (
    <>
      <HomeScreen />
      <BottomNav />
    </>
  );
}
