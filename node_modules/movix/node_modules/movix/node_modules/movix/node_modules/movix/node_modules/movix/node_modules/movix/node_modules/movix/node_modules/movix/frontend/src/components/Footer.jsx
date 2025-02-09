"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, ChevronDown, Globe } from 'lucide-react';

export function Footer() {
  const [language, setLanguage] = useState("English");

  const footerLinks = [
    [
      { text: "FAQ", href: "/faq" },
      { text: "Investor Relations", href: "/investors" },
      { text: "Privacy", href: "/privacy" },
      { text: "Speed Test", href: "/speed" },
    ],
    [
      { text: "Help Center", href: "/help" },
      { text: "Jobs", href: "/jobs" },
      { text: "Cookie Preferences", href: "/cookies" },
      { text: "Legal Notices", href: "/legal" },
    ],
    [
      { text: "Account", href: "/account" },
      { text: "Ways to Watch", href: "/ways-to-watch" },
      { text: "Corporate Information", href: "/corporate" },
      { text: "Only on Movix", href: "/only-on-movix" },
    ],
    [
      { text: "Media Center", href: "/media-center" },
      { text: "Terms of Use", href: "/terms" },
      { text: "Contact Us", href: "/contact" },
      { text: "Redeem Gift Cards", href: "/redeem" },
    ],
  ];

  const socialLinks = [
    { icon: Facebook, href: "/", label: "Facebook" },
    { icon: Twitter, href: "/", label: "Twitter" },
    { icon: Instagram, href: "/", label: "Instagram" },
    { icon: Youtube, href: "/", label: "YouTube" },
    { icon: Linkedin, href: "/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link to="/contact" className="text-gray-300 underline text-base md:text-lg">
            Questions? Contact us
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-2 md:gap-4">
              {column.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  to={link.href}
                  className="text-xs md:text-sm hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 md:mb-12">
          <Link to="/" className="block mb-4 md:mb-0">
            <img
              src="/movix-logo.png"
              alt="Movix-logo"
              width={120}
              height={40}
              className="w-auto h-8 md:h-10"
            />
          </Link>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 rounded-full p-2 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="relative w-full md:w-auto mb-4 md:mb-0">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full md:w-auto appearance-none bg-black/75 border border-gray-700 rounded-md pl-8 pr-8 py-2 focus:outline-none focus:border-gray-600 text-sm"
            >
              <option value="English">English</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-gray-300">
              <Globe className="w-4 h-4" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-300">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs md:text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Movix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

