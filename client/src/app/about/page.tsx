"use client";

import Footer from "@/components/footer/footer";
import About from "@/components/about/about";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="w-screen bg-gray-500 flex flex-col">
      <Navbar />
      <About/>
      <Footer />
    </div>
  );
}