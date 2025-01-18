import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ user }) {
      // You can skip database insertions if you're not using a DB like Supabase
      return true; // User can always sign in successfully
    },
    session: ({ session, user }) => {
      // Instead of using JWT, the user ID can be attached directly to the session.
      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id, // Directly using user from the session callback
        },
      };
    },
  },
  debug: true,
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
