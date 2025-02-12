import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import type { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;
        
        // For development, allow a simple admin login
        if (process.env.NODE_ENV === 'development' &&
            credentials.email === 'admin@local' &&
            credentials.password === 'admin') {
          return { 
            id: '1', 
            email: 'admin@local', 
            name: 'Admin',
            image: null
          };
        }
        
        // For production, check against your actual admin credentials
        if (credentials.email === process.env.ADMIN_EMAIL &&
            credentials.password === process.env.ADMIN_PASSWORD) {
          return { 
            id: '1', 
            email: credentials.email as string,
            name: 'Admin',
            image: null
          };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    signOut: '/auth/signout'
  },
  session: {
    strategy: 'jwt'
  }
};

const auth = NextAuth(config);

export const { GET, POST } = auth.handlers;
