import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { NextAuthConfig } from 'next-auth';
import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        // In development, always authorize
        return {
          id: '1',
          email: 'admin@local',
          name: 'Admin'
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token }: { token: JWT }) {
      return token;
    },
    async session({ session }: { session: Session }) {
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);

export const { GET, POST } = handlers;
