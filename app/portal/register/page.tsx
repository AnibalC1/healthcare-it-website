'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function PortalRegister() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const emailRedirectTo =
        typeof window !== 'undefined' ? `${window.location.origin}/portal/login` : undefined;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });

      if (signUpError) throw signUpError;

      // If email confirmation is enabled in Supabase, no session is returned.
      if (data.session) {
        router.push('/training');
      } else {
        setNeedsConfirmation(true);
      }
    } catch (err: any) {
      setError(err.message || 'Could not create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-3xl font-bold text-blue-600 mb-2">Healthcare IT Solutions</div>
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Access your client portal and training courses</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {needsConfirmation ? (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✉
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Confirm your email</h2>
              <p className="text-gray-600 mb-6">
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate your
                account, then sign in.
              </p>
              <Link
                href="/portal/login"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Go to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@practice.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Re-enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

          {!needsConfirmation && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/portal/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secured with 256-bit encryption</span>
          </div>
          <p>HIPAA-compliant • SOC 2 Type II certified</p>
        </div>
      </div>
    </div>
  );
}
