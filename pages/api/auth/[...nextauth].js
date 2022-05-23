import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signOut } from 'next-auth/react';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.apiUrl}/login`,
          {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              role: credentials.role,
            }),
          }
        );
        const result = await response.json();

        if (result.status == 'success') {
          // const session = await getSession({ data });
          // 
          // router.push('/');

          return result;
        } else {
          if (result.errors) {
            throw new Error(result.errors);
          } else {
            throw new Error(result.message);
          }
          // 
        }
      },
    }),
  ],

  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  secret: 'honey_nwg_projects',
  jwt: {
    secret: 'honey_nwg_projects',
    encryption: true,
  },
});
