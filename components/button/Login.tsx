"use client";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { inAppWallet } from "thirdweb/wallets";
import { useConnect } from "thirdweb/react";
import { client } from "@/lib/thirdweb/client";
import { Loader2 } from "lucide-react";

export function LoginButton() {
  const { data: session, status } = useSession();
  const { connect } = useConnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Log the session data after it changes
    console.log("Session updated:", session);
  }, [session]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!session) {
        // If not signed in, sign in first
        const result = await signIn("worldcoin", { redirect: false });
        if (result?.error) {
          throw new Error(result.error);
        }
      }

      // Now connect the wallet if session exists
      const userName = session?.user?.name ?? "anonymous"; // Fallback to "anonymous" if name is undefined or null
      if (userName !== "anonymous") {
        console.log("Connecting wallet with user name:", userName);
        await connect(async () => {
          const wallet = inAppWallet();
          await wallet.connect({
            client,
            strategy: "auth_endpoint",
            payload: userName, // Use session name (or fallback) here
          });
          return wallet;
        });
      } else {
        setError("You need to be logged in to connect your wallet.");
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (status === "loading") {
    return (
      <button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!session ? (
        <button
          onClick={handleConnectWallet}
          disabled={isConnecting}
          className="w-1/2 rounded-[20px] bg-zinc-900 text-white h-[45px]"
        >
          Sign in with thirdweb
        </button>
      ) : (
        <button
          onClick={handleSignOut}
          className="w-1/2 rounded-[20px] bg-zinc-900 text-white h-[45px]"
        >
          Sign Out
        </button>
      )}
      {session?.user?.name && (
        <p className="text-sm text-gray-500">
          Welcome, {session.user.name.slice(0, 10)}
        </p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
