import { auth, signIn, signOut, handlers } from '@/lib/auth';

describe('Auth Configuration', () => {
  it('should export required auth functions', () => {
    expect(auth).toBeDefined();
    expect(signIn).toBeDefined();
    expect(signOut).toBeDefined();
    expect(handlers).toBeDefined();
    expect(handlers.GET).toBeDefined();
    expect(handlers.POST).toBeDefined();
  });

  it('should handle admin authentication', async () => {
    const session = await auth();
    console.log('Auth Session:', session);

    // Test admin credentials
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    console.log('Admin Email:', adminEmail);

    if (session?.user) {
      console.log('User:', session.user);
      expect(session.user.email).toBeDefined();
    } else {
      console.log('No session found');
    }
  });
});
