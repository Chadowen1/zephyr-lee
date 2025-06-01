import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { Montserrat } from 'next/font/google';
import { AuthProvider } from '@/context/authContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Your App',
  description: 'App description',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-montserrat">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}