import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { useState, useCallback } from "react";

// Define the type for the verify command input
export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "verify", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

// Custom hook for handling the verification process
export const useVerify = () => {
  const [verifyResponse, setVerifyResponse] = useState<
    MiniAppVerifyActionErrorPayload | IVerifyResponse | null
  >(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
      return null;
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

    // Check for error in the verification process
    if (finalPayload.status === "error") {
      console.log("Command error");
      console.log(finalPayload);

      setVerifyResponse(finalPayload);
      return finalPayload;
    }

    // Send verification data to backend
    const verifyResponseBackend = await fetch(`/api/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: finalPayload as ISuccessResult, // Only parse the necessary fields
        action: verifyPayload.action,
        signal: verifyPayload.signal, // Optional
      }),
    });

    const verifyResponseJson = await verifyResponseBackend.json();

    if (verifyResponseJson.status === 200) {
      console.log("Verification success!");
      console.log(finalPayload);
    }

    setVerifyResponse(verifyResponseJson);
    return verifyResponseJson;
  }, []);

  return {
    verifyResponse,
    handleVerify,
  };
};
