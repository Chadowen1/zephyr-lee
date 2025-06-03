'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/services/authService';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';

type FormData = {
  Nom: string;
  Email: string;
  MotDePasse: string;
  ConfirmPassword: string;
};

export default function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    Nom: '',
    Email: '',
    MotDePasse: '',
    ConfirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      // Basic validation
      if (!formData.Nom || !formData.Email || !formData.MotDePasse || !formData.ConfirmPassword) {
        throw new Error('All fields are required');
      }
  
      if (formData.MotDePasse !== formData.ConfirmPassword) {
        throw new Error('Passwords do not match');
      }
  
      if (formData.MotDePasse.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
  
      // Call signup service
      await signUp({
        Nom: formData.Nom,
        Email: formData.Email,
        MotDePasse: formData.MotDePasse,
        Role: 'user',
        Adress: 'Not specified',
        Telephone: 'Not specified'
      });
      
      // Redirect on success
      router.push('/login');
    } catch (err: unknown) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        const axiosError = err as {
          response?: {
            data?: {
              error?: string;
              message?: string;
            };
          };
          message?: string;
        };
        
        errorMessage = 
          axiosError.response?.data?.error || 
          axiosError.response?.data?.message ||
          axiosError.message || 
          errorMessage;
      }
  
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex w-screen h-screen bg-white flex-col">
      <Navbar />
      <div className="flex w-full h-full flex-row">
        {/* Left Section (Black) */}
        <div className="w-1/2 bg-black h-full relative shadow-lg">
          <Image
            src="/zouz.jpg" 
            alt="Signup background"
            quality={100}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Section (Gray) */}
        <div className="w-1/2 bg-gray-100 h-full flex items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-96 p-8 rounded-xl">
            <h1 className="text-4xl font-bold text-center text-[#102609] mb-4">
              Sign Up
            </h1>

            {/* Name Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="Nom"
                  placeholder="Enter your name"
                  value={formData.Nom}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] text-black placeholder-gray-500 transition-all"
                  required
                />
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="Email"
                  placeholder="Enter your email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] text-black placeholder-gray-500 transition-all"
                  required
                />
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
                  name="MotDePasse"
                  placeholder="Enter your password (min 8 characters)"
                  value={formData.MotDePasse}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] text-black placeholder-gray-500 transition-all"
                  required
                  minLength={8}
                />
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

            {/* Confirm Password Field */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="ConfirmPassword"
                  placeholder="Confirm your password"
                  value={formData.ConfirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D812C] focus:border-[#4D812C] text-black placeholder-gray-500 transition-all"
                  required
                  minLength={8}
                />
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
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                {error.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-700">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-[#4D812C] hover:underline transition-all"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}