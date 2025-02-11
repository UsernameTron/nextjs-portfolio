import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { compare } from 'bcryptjs';
import { config } from '../[...nextauth]/route';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import type { Account } from 'next-auth';

// Mock environment variables
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.ADMIN_EMAIL = 'admin@example.com';
process.env.ADMIN_PASSWORD = '$2a$10$test-hashed-password';

// Mock bcryptjs
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

describe('Authentication Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Credentials Provider', () => {
    const provider = config.providers[0];

    it('should authenticate valid admin credentials', async () => {
      // Mock successful password comparison
      (compare as jest.Mock).mockImplementationOnce(() => Promise.resolve(true));

      const credentials = {
        username: 'admin@example.com',
        password: 'correct-password',
      };

      const result = await provider.authorize!(credentials, {} as any);

      expect(result).toEqual({
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
      });
    });

    it('should reject invalid credentials', async () => {
      // Mock failed password comparison
      (compare as jest.Mock).mockImplementationOnce(() => Promise.resolve(false));

      const credentials = {
        username: 'admin@example.com',
        password: 'wrong-password',
      };

      await expect(provider.authorize!(credentials, {} as any))
        .rejects
        .toThrow('Invalid credentials');
    });

    it('should reject non-admin email', async () => {
      const credentials = {
        username: 'user@example.com',
        password: 'any-password',
      };

      await expect(provider.authorize!(credentials, {} as any))
        .rejects
        .toThrow('Invalid credentials');
    });

    it('should reject invalid email format', async () => {
      const credentials = {
        username: 'invalid-email',
        password: 'any-password',
      };

      await expect(provider.authorize!(credentials, {} as any))
        .rejects
        .toThrow('Invalid email format');
    });

    it('should reject missing credentials', async () => {
      const credentials = {};

      await expect(provider.authorize!(credentials, {} as any))
        .rejects
        .toThrow('Please provide both email and password');
    });
  });

  describe('Session Handling', () => {
    it('should include user info in JWT token', async () => {
      const token = {} as JWT;
      const user = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
      };
      const account = null as Account | null;

      const result = await config.callbacks!.jwt!({ token, user, account, trigger: 'signIn' });

      expect(result).toEqual({
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
      });
    });

    it('should maintain existing token without user', async () => {
      const token = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
      } as JWT;
      const account = null as Account | null;

      const result = await config.callbacks!.jwt!({ token, account, trigger: 'update' });

      expect(result).toEqual(token);
    });

    it('should create session from token', async () => {
      const token = {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
      } as JWT;

      const session = { user: {} } as Session;

      const result = await config.callbacks!.session!({ session, token });

      expect(result).toEqual({
        user: {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin User',
          role: 'admin',
        },
      });
    });
  });
});
