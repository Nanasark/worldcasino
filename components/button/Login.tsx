"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { inAppWallet } from "thirdweb/wallets";
import { useConnect } from "thirdweb/react";
import { client } from "@/lib/thirdweb/client";

export function LoginButton() {
  const { data: session, status } = useSession();
  const { connect } = useConnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!session) {
        // If not signed in, sign in first
        const result = await signIn("worldcoin", { redirect: false });
        if (result?.error) {
          throw new Error(result.error);
        }
      }

      // Now connect the wallet
      await connect(async () => {
        const wallet = inAppWallet();
        await wallet.connect({
          client,
          strategy: "auth_endpoint",
          payload: session?.user?.id || "anonymous", // Use session ID if available, or a placeholder
        });
        return wallet;
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      <button onClick={handleConnectWallet} disabled={isConnecting}>
        {isConnecting
          ? "Connecting..."
          : session
          ? "Connect Wallet"
          : "Sign In and Connect Wallet"}
      </button>
      {session && <button onClick={() => signOut()}>Sign Out</button>}
    </div>
  );
}
