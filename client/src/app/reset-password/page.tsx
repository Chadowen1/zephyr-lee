'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/services/authService';

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await resetPassword(token, password);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');  
        }, 3000);
      } else {
        setError(result.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Reset Password error', error);
      setError('Failed to reset password. The link may be expired or invalid.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBEBE1] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#102609] p-6">
            <h1 className="text-2xl font-bold text-white">Create New Password</h1>
            <p className="text-[#EBEBE1] mt-1">Enter and confirm your new password</p>
          </div>

          {success ? (
            <div className="p-6">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Password reset successfully! Redirecting to login...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter new password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] outline-none transition"
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] outline-none transition"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-[#4D812C]/70 cursor-not-allowed' : 'bg-[#000000] hover:bg-[#3a6a21]'}`}
              >
                {isLoading ? 'Processing...' : 'Reset Password'}
              </button>
            </form>
          )}

          <div className="bg-gray-50 px-6 py-4 border-t">
            <p className="text-sm text-gray-600 text-center">
              Remember your password?{' '}
              <a href="/login" className="font-medium text-[#4D812C] hover:text-[#23371c]">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}