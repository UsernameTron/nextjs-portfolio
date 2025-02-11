'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(true);

  useEffect(() => {
    const performSignOut = async () => {
      try {
        await signOut({ redirect: false });
        router.push('/');
      } catch (error) {
        console.error('Error signing out:', error);
        setIsSigningOut(false);
      }
    };

    performSignOut();
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-neutral-900 rounded-lg border border-neutral-800">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Signing Out
          </h1>
          {isSigningOut ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div>
              <p className="text-red-500">There was an error signing out.</p>
              <button
                onClick={() => {
                  setIsSigningOut(true);
                  signOut({ redirect: false }).then(() => router.push('/'));
                }}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
