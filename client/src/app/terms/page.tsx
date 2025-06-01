"use client";

import Footer from "@/components/footer/footer";
import Terms from "@/components/terms/terms";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="w-screen bg-gray-500 flex flex-col">
      <Navbar />
      <Terms />
      <Footer />
    </div>
  );
}