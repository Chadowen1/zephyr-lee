"use client";

import { useEffect, useState } from 'react';
import { getUserById } from '@/services/userService';
import Footer from "@/components/footer/footer";
import Account, { UserData } from "@/components/account/account";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) throw new Error("No user found in localStorage");

        const { id } = JSON.parse(storedUser);
        const user = await getUserById(id);
        setUserData(prev => ({
          ...prev,
          name: user.Nom || '',
          email: user.Email || '',
          phone: user.Telephone || '',
        }));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-screen bg-gray-500 flex flex-col">
      <Navbar />
      <Account userData={userData} setUserData={setUserData} />
      <Footer />
    </div>
  );
}