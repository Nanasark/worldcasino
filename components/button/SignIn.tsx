"use client";
import { useSignIn } from "@/hooks/useSignIn";

export function SignInBtn() {
  const { handleSignIn, session, status } = useSignIn();
  return (
    <>
      <button
        onClick={handleSignIn}
        className="w-1/2 rounded-[20px] bg-zinc-900 text-white h-[45px]"
      >
        Sign In
      </button>
    </>
  );
}
