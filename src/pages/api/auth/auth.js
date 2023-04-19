import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "emailpassword",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "emailpassword",
      type: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await axios.post("https://localhost:7028/auth/signin", payload);
        // const res = await fetch("https://localhost:7028/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(credentials),
        // })
        console.log(res);
        if (res.success == true && res.value) {
          const user = res.value.token;
          return user;
        }
        //   .then((res) => {
        //     console.log(res);
        //     console.log(res.data);
        //     const message = res.data.message;

        //     if (res.data.success == true && res.data.value) {
        //         const user = res.data.value;
        //       localStorage.setItem("session_user", res.data.value);
        //       return user;
        //     }
        //   });
        // If you return null then an error will be displayed advising the user to check their details.
        return null;
      },
    }),
  ],
  //   session: {
  //     jwt: true,
  //   },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log(user);
    //   //authorize(credentials);
    //   return user;
    // },
    async jwt({ user, token }) {
      if (user?.accessToken) {
      token.value = user.accessToken;
        }
      console.log(token); //<-- output below
      return token;
    },
    async session(session, token) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",

  },
};

export default NextAuth(authOptions);
