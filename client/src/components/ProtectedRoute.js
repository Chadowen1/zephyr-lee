'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import LoadingSpinner from '@/components/ui/loadingSpinner';

export default function ProtectedRoute({ children, requiredRole }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      // If no user but not loading, redirect to login
      if (!user) {
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      // Check role if required
      if (requiredRole && user.Role !== requiredRole) {
        router.push('/unauthorized');
        return;
      }

      // If all checks pass
      setIsAuthorized(true);
    }
  }, [user, loading, router, requiredRole]);

  if (loading || !isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return children;
}