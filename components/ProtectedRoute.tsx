// "use client";

// import { useAuth } from "context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { token, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !token) {
//       router.push("/login");
//     }
//   }, [token, loading]);

//   if (loading || !token) {
//     return null; // or a loader/spinner
//   }

//   return <>{children}</>;
// };
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// You might want a full-page loader component for a better UX
const FullPageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    {/* You can use your preferred loading spinner here */}
    <p>Loading...</p>
  </div>
);

// Define the props to accept children
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  // State to track authentication status: 'loading', 'authenticated', 'unauthenticated'
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    // This effect runs once on component mount to check the token
    const token = localStorage.getItem('token');
    
    if (token) {
      // If a token exists, we consider the user authenticated for now.
      // You might add a step here to verify the token with your backend.
      setAuthStatus('authenticated');
    } else {
      // If no token, the user is unauthenticated.
      setAuthStatus('unauthenticated');
    }
  }, []); // The empty dependency array ensures this runs only once

  useEffect(() => {
    // This effect reacts to changes in the authentication status
    if (authStatus === 'unauthenticated') {
      // If the status is confirmed to be unauthenticated, redirect to login
      router.push('/login');
    }
  }, [authStatus, router]);

  // While we are checking the token, show a loader
  if (authStatus === 'loading') {
    return <FullPageLoader />;
  }

  // If authenticated, render the children components (your DesktopApp)
  if (authStatus === 'authenticated') {
    return <>{children}</>;
  }

  // If unauthenticated, we are in the process of redirecting.
  // Render a loader or null to avoid a flash of unstyled content.
  return <FullPageLoader />;
};