'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { requestReset } from '@/services/authService';

export default function RequestResetForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  
  try {
    const result = await requestReset(email);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message || 'Failed to send reset link.');
    }
  } catch (error) {
    console.error('Request Reset error:', error);
    setError('Failed to send reset link. Please check your email address.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#EBEBE1] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#102609] p-6">
            <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
            <p className="text-[#EBEBE1] mt-1">Enter your email to receive a reset link</p>
          </div>
          
          {success ? (
            <div className="p-6">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Reset link sent successfully! Please check your email.
              </div>
              <button
                onClick={() => router.push('/login')}
                className="w-full py-3 px-4 rounded-lg font-medium text-white bg-[#4D812C] hover:bg-[#37651f] transition"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] outline-none transition"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-[#4D812C]/70 cursor-not-allowed' : 'bg-[#000000] hover:bg-[#3a6a21]'}`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
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