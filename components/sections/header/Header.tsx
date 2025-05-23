"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Twitter,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { navigationLinks } from "@/constants";
import SearchPage from "./Search";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
  const socialLinks = [
    { href: "#", icon: <Facebook size={16} /> },
    { href: "#", icon: <Twitter size={16} /> },
    { href: "#", icon: <Instagram size={16} /> },
  ];

  const pathname = usePathname();

  const { data: session } = useSession();

  return (
    <header className="bg-gray-900 text-white">
      {/** Top Bar */}
      <div className="flex container mx-auto h-16 justify-center md:justify-between items-center px-4 py-2 text-sm">
        <div className="flex items-center gap-5">
          <div className="flex gap-3 items-center">
            <div className="bg-white p-2 rounded-full">
              <MessageCircle size={12} className="text-orange-500" />
            </div>
            info@travel.com
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-white p-2 rounded-full">
              <Phone size={12} className="text-orange-500" />
            </div>
            +90 545 641 62 69
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="hover:text-orange-500"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
      {/** Navigation Bar */}
      <div className="bg-white h-28 text-black shadow items-center">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Image
            src={"/logo.png"}
            priority={true}
            alt="Travel"
            width={210}
            height={50}
            className="w-36 lg:w-52 h-auto"
          />
          <nav className="hidden lg:flex space-x-8 text-lg font-semibold">
            {navigationLinks.map((navLink, index) => (
              <Link
                key={index}
                href={navLink.href}
                className={`${
                  pathname == navLink.href
                    ? "underline decoration-orange-500"
                    : "hover:text-orange-500"
                }`}
              >
                {navLink.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <SearchPage />
            {session ? (
              <Link
                href="/profile"
                className="p-3 lg:flex bg-orange-500 cursor-pointer text-white rounded-full"
              >
                <UserPlus />
              </Link>
            ) : (
              <Link
                href="/login"
                className="p-3 lg:flex bg-blue-400 cursor-pointer text-white rounded-full"
              >
                <User />
              </Link>
            )}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
