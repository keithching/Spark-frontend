// https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import FullPageLoader from './FullPageLoader';

export default function PrivateRoute({ protectedRoutes, children }) {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!isLoading && !currentUser && pathIsProtected) {
      // Redirect route, you can point this to /login
      router.push('/');
    }
  }, [isLoading, currentUser, pathIsProtected]);

  if ((isLoading || !currentUser) && pathIsProtected) {
    return <FullPageLoader />;
  }

  return children;
}