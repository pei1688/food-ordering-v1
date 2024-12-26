import { User } from "@/app/models/User";
import connectDB from "@/lib/db";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentails",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;
        await connectDB();
        const user = await User.findOne({ email }).select("+password +role");

        if (!user) {
          throw new Error("無效的電子信箱");
        }

        if (!user.password) throw new Error("無效的電子信箱或密碼");

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("密碼錯誤");
        }

        const userData = {
          name: user.name,
          role: user.role,
          id: user._id,
          email: user.email,
          image: user.image,
        };
        return userData;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, id, name, image } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });
          if (!alreadyUser) {
            await User.create({
              name,
              email,
              authProviderId: id,
              image,
            });
          }
          return true; // 確保成功時返回 true
        } catch (error) {
          console.error("Error during user creation:", error);
          return false; // 錯誤時返回 false
        }
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false; // 預設返回 false
    },
  },
});
