"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userName: "My Account"
  });

  // Check auth state after component mounts
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token) {
      try {
        const userData = user ? JSON.parse(user) : null;
        setAuthState({
          isLoggedIn: true,
          userName: userData?.Nom || "My Account"
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ isLoggedIn: false, userName: "My Account" });
    router.push("/login");
  };

  // Return simplified navbar during SSR
  if (!isMounted) {
    return (
      <div className="w-full h-[4.5rem] bg-white flex items-center justify-between px-8 border-b">
        {/* Logo only during SSR */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logonobg.png"
              alt="Logo"
              width={72}
              height={40}
              quality={100}
              className="object-contain"
            />
          </Link>
        </div>
        {/* Empty space where buttons would be */}
        <div className="w-[200px]"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[4.5rem] bg-white flex items-center justify-between px-8 border-b">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logonobg.png"
            alt="Logo"
            width={72}
            height={40}
            quality={100}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/home"
            className="text-black hover:text-gray-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-black hover:text-gray-700 transition-colors"
          >
            About
          </Link>
          <Link
            href="/invest"
            className="text-black hover:text-gray-700 transition-colors"
          >
            Invest in Tunisia
          </Link>
          <Link
            href="/abroad"
            className="text-black hover:text-gray-700 transition-colors"
          >
            Live Abroad
          </Link>
          <Link
            href="/contact"
            className="text-black hover:text-gray-700 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {authState.isLoggedIn ? (
            <>
              <Button 
                asChild
                variant="outline"
                className="border-[#0e1812] text-[#0e1812] hover:bg-gray-50"
              >
                <Link href="/account">{authState.userName}</Link>
              </Button>
              <Button 
                onClick={handleLogout}
                className="bg-[#0e1812] text-white hover:bg-[#1a2b1f]"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                asChild
                className="border-[#0e1812] text-[#0e1812] hover:bg-gray-50"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button 
                asChild
                className="bg-[#0e1812] text-white hover:bg-[#1a2b1f]"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}