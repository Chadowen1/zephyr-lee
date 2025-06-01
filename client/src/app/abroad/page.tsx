"use client";

import Footer from "@/components/footer/footer";
import Abroad from "@/components/abroad/abroad";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="w-screen bg-gray-500 flex flex-col">
      <Navbar />
      <Abroad />
      <Footer />
    </div>
  );
}