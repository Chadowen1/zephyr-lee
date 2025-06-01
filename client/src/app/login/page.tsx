'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { login } from '@/services/authService';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const [Email, setEmail] = useState('');
  const [MotDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/home';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { token, user } = await login(Email, MotDePasse);
      
      if (!token) {
        throw new Error('No authentication token received');
      }
  
      // Store auth data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect
      router.push(redirect);
    } catch (error: unknown) {
      let errorMessage = 'Login failed. Please try again.';
      
      // Type guard to check if it's an Error object
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Type guard for Axios error
        if ('response' in error) {
          const axiosError = error as {
            response?: {
              data?: {
                error?: string;
                message?: string;
                details?: string;
              };
              status?: number;
            };
          };
          
          errorMessage = axiosError.response?.data?.error || 
                        axiosError.response?.data?.message || 
                        errorMessage;
          
          // Temporary debug logging - remove in production
          console.log('Response data:', axiosError.response?.data);
          console.log('Response status:', axiosError.response?.status);
        }
      }
  
      setError(errorMessage);
      console.log('Full error object:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white flex-col">
      <Navbar />
      <div className="flex w-full h-full flex-row">
        {/* Left Section (Black) */}
        <div className="w-1/2 bg-black h-full relative shadow-lg">
          <Image
            src="/un.jpg"
            alt=""
            quality={100}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Section (Gray) */}
        <div className="w-1/2 bg-gray-100 h-full flex items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-96 p-8 rounded-xl">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-center text-[#102609] mb-4">
              Login
            </h1>

            {/* Email Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] text-black placeholder-gray-500 transition-all"
                  required
                />
                {/* Email Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={MotDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] text-black placeholder-gray-500 transition-all"
                  required
                />
                {/* Password Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-3 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">↻</span>
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* Forgot Password Link */}
            <Link
              href='../request-link'
              className="text-sm text-gray-700 hover:text-black hover:underline text-center transition-all"
            >
              Forgot Password?
            </Link>

            {/* Sign Up Link */}
            <p className="text-sm text-center text-gray-700">
              {`Don't have an account?`}{" "}
              <Link
                href="/signup"
                className="text-[#4D812C] hover:underline transition-all"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}