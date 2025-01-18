import { useSession, signIn, signOut } from "next-auth/react";

// Custom hook for handling authentication
export const useSignIn = () => {
  const { data: session, status } = useSession();

  const handleSignIn = () => {
    signIn("worldcoin");
  };

  const handleSignOut = () => {
    signOut();
  };

  return {
    session,
    status,
    handleSignIn,
    handleSignOut,
  };
};
