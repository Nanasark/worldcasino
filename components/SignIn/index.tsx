"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const SignIn = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="text-center p-4">
        <p className="mb-4">Signed in as {session?.user?.name?.slice(0, 10)}</p>
        <button
          className="bg-black text-white rounded-[15px] px-4 py-2 ring-2 ring-white hover:bg-gray-800 focus:outline-none focus:ring-4"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className="text-center p-4">
        <p className="mb-4">Not signed in</p>
        <button
          className="bg-black text-white rounded-[15px] px-4 py-2 ring-2 ring-white hover:bg-gray-800 focus:outline-none focus:ring-4"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    );
  }
};
