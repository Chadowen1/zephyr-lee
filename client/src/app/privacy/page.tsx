"use client";

import Footer from "@/components/footer/footer";
import Privacy from "@/components/privacy/privacy";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="w-screen bg-gray-500 flex flex-col">
      <Navbar />
      <Privacy />
      <Footer />
    </div>
  );
}