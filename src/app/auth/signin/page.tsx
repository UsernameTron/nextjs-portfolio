'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type ValidationErrors = {
  email?: string;
  password?: string;
};

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Clear error when user changes input
  useEffect(() => {
    if (error) setError('');
  }, [formData]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific validation error when user types
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        username: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        switch (result.error) {
          case 'CredentialsSignin':
            setError('Invalid email or password');
            break;
          default:
            setError('An error occurred during sign in');
        }
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-neutral-900 rounded-lg border border-neutral-800">
        <div className="text-center space-y-6">
          <Link 
            href="/"
            className="inline-block text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:from-blue-400 hover:to-purple-500 transition-all"
          >
            No AI Grift
          </Link>
          <h2 className="text-2xl font-semibold">Admin Access</h2>
          {error && (
            <div className="p-4 bg-red-950 border border-red-900 rounded-md text-red-500 text-sm animate-shake">
              {error}
            </div>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 bg-neutral-800 border rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 transition-colors ${
                  validationErrors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-neutral-700 focus:ring-blue-500'
                }`}
                placeholder="admin@example.com"
                disabled={isLoading}
                aria-invalid={!!validationErrors.email}
                aria-describedby={validationErrors.email ? 'email-error' : undefined}
              />
              {validationErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 bg-neutral-800 border rounded-md text-white placeholder-neutral-400 focus:outline-none focus:ring-2 transition-colors ${
                  validationErrors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-neutral-700 focus:ring-blue-500'
                }`}
                placeholder="••••••••"
                disabled={isLoading}
                aria-invalid={!!validationErrors.password}
                aria-describedby={validationErrors.password ? 'password-error' : undefined}
              />
              {validationErrors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-500">
                  {validationErrors.password}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 text-white rounded-md transition-all font-medium flex items-center justify-center ${
              isLoading
                ? 'bg-blue-800 cursor-not-allowed opacity-70'
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
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
