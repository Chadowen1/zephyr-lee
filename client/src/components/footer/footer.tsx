// components/Footer.tsx
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHome, FaGlobeAmericas, FaInfoCircle } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full">
      {/* Main Footer - Black Background */}
      <footer className="bg-black text-white">
        <div className="container mx-auto px-20 py-12 grid grid-cols-1 md:grid-cols-4 gap-20">
          
          {/* Brand Column */}
          <div>
            <h3 className="text-xl font-medium mb-4">Zephyr</h3>
            <p className="text-[#EBEBE1]/80 text-sm leading-relaxed">
            A website designed to provide housing assistance and help people find the perfect place to call home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: "/", text: "Home", icon: <FaHome className="mr-2" /> },
                { href: "/about", text: "About", icon: <FaInfoCircle className="mr-2" /> },
                { href: "/invest", text: "Invest in Tunisia", icon: <FaHome className="mr-2" /> },
                { href: "/abroad", text: "Live Abroad", icon: <FaGlobeAmericas className="mr-2" /> },
              ].map((item) => (
                <li key={item.text}>
                  <Link href={item.href} className="flex items-center text-[#EBEBE1]/90 hover:text-[#4D812C] text-sm transition-colors">
                    {item.icon}
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {[
                "Tunisia Investments",
                "Global Rentals",
                "Relocation Support",
                "Diaspora Services"
              ].map((service) => (
                <li key={service} className="text-[#EBEBE1]/90 hover:text-[#4D812C] text-sm transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-start text-[#EBEBE1]/90 text-sm">
                <FaMapMarkerAlt className="mt-0.5 mr-2 flex-shrink-0" />
                <span>Tunis, Tunisia</span>
              </div>
              <div className="flex items-center text-[#EBEBE1]/90 text-sm">
                <FaPhone className="mr-2" />
                <span>+216 12 345 678</span>
              </div>
              <div className="flex items-center text-[#EBEBE1]/90 hover:text-[#4D812C] text-sm transition-colors">
                <FaEnvelope className="mr-2" />
                <span>contact@zephyr.tn</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar - White Background */}
      <div className="bg-white text-black border-t border-gray-100">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links - Left */}
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-[#4D812C] transition-colors">
                <FaFacebook size={16} />
              </a>
              <a href="#" className="hover:text-[#4D812C] transition-colors">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="hover:text-[#4D812C] transition-colors">
                <FaLinkedin size={16} />
              </a>
              <a href="#" className="hover:text-[#4D812C] transition-colors">
                <FaInstagram size={16} />
              </a>
            </div>

            {/* Copyright - Center */}
            <div className="text-xs text-gray-600">
              © 2025 Zephyr. All rights reserved.
            </div>

            {/* Legal Links - Right */}
            <div className="flex items-center space-x-4 text-xs">
              <Link href="/privacy" className="hover:text-[#4D812C] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#4D812C] transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}