import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [],
  session: { strategy: 'jwt' },
  trustHost: true,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session.user.role = token.role as any;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
