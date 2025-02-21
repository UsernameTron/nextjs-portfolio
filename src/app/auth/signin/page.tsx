'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect, Suspense, FormEvent, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Link from 'next/link';

interface ValidationErrors {
  email?: string;
  password?: string;
}

interface FormData {
  email: string;
  password: string;
}

interface SignInFormProps {
  router: AppRouterInstance;
  callbackUrl: string;
}

interface SignInResult {
  error?: string;
  status?: number;
  ok?: boolean;
  url?: string;
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-neutral-950">Loading...</div>}>
      <SignInContent />
    </Suspense>
  )
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
      <SignInForm router={router} callbackUrl={callbackUrl} />
    </div>
  );
}

function SignInForm({ router, callbackUrl }: SignInFormProps) {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (error) setError('');
  }, [formData, error]);

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    console.log('🔐 Attempting sign in...');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed:', validationErrors);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      console.log('📤 Sending credentials...');
      const result = await signIn<'credentials'>('credentials', {
        username: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl,
      }) as SignInResult;

      console.log('📥 Sign in result:', result);

      if (result?.error) {
        console.error('🚫 Sign in error:', result.error);
        switch (result.error) {
          case 'CredentialsSignin':
            setError('Invalid email or password');
            break;
          default:
            setError('An error occurred during sign in');
        }
      } else {
        console.log('✅ Sign in successful, redirecting...');
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('💥 Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 p-10 bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800/50 shadow-2xl">
        <div className="text-center space-y-4">
          <Link 
            href="/"
            className="inline-block text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 text-transparent bg-clip-text hover:from-blue-300 hover:via-blue-400 hover:to-purple-500 transition-all duration-300"
          >
            No AI Grift
          </Link>
          <h2 className="text-xl font-medium text-neutral-200">Admin Access</h2>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-shake">
              {error}
            </div>
          )}
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2.5 bg-neutral-800/50 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  validationErrors.email
                    ? 'border-red-500/50 focus:ring-red-500/20'
                    : 'border-neutral-700/50 focus:ring-blue-500/20 hover:border-neutral-600/50'
                }`}
                placeholder="admin@example.com"
                disabled={isLoading}
                aria-invalid={!!validationErrors.email}
                aria-describedby={validationErrors.email ? 'email-error' : undefined}
              />
              {validationErrors.email && (
                <p id="email-error" className="mt-1.5 text-sm text-red-400">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-200 mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2.5 bg-neutral-800/50 border rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  validationErrors.password
                    ? 'border-red-500/50 focus:ring-red-500/20'
                    : 'border-neutral-700/50 focus:ring-blue-500/20 hover:border-neutral-600/50'
                }`}
                placeholder="••••••••"
                disabled={isLoading}
                aria-invalid={!!validationErrors.password}
                aria-describedby={validationErrors.password ? 'password-error' : undefined}
              />
              {validationErrors.password && (
                <p id="password-error" className="mt-1.5 text-sm text-red-400">
                  {validationErrors.password}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2.5 text-white rounded-lg transition-all duration-200 font-medium flex items-center justify-center ${
              isLoading
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
