'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const errorMessages: Record<string, string> = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to access this resource.',
  Verification: 'The verification failed or the token has expired.',
  Default: 'An error occurred while trying to authenticate.',
};

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-neutral-900 rounded-lg border border-neutral-800">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-600 text-transparent bg-clip-text">
            Authentication Error
          </h1>
          <div className="p-4 bg-red-950 border border-red-900 rounded-md text-red-500">
            {errorMessage}
          </div>
          <div className="pt-4">
            <Link
              href="/auth/signin"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
