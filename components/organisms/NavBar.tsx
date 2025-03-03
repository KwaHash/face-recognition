'use client';

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Clapperboard, Images, Menu, X } from 'lucide-react';
import Logo from "@/components/atoms/Logo";

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="w-full fixed bg-white shadow-lg z-50">
      <div className="mx-auto px-6 sm:px-16">
        <div className="flex justify-between h-20">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="hidden sm:flex iterms-center space-x-8">
            <Link href="/" className={`flex gap-3 items-center justify-center transition-all duration-300 ease-out font-bold ${pathname === "/" ? 'text-m-indigo' : 'text-m-gray hover:text-m-indigo'}`}>
              <Images />
              <span>顔一覧</span>
            </Link>
            <Link href="/register" className={`flex gap-3 items-center justify-center transition-all duration-300 ease-out font-bold ${pathname === "/register" ? 'text-m-indigo' : 'text-m-gray hover:text-m-indigo'}`}>
              <Clapperboard />
              <span className="font-bold">顔登録</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={33} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white border-t">
          <div className="min-h-[calc(100vh-80px)] px-4 pt-2 pb-4 space-y-2">
            <Link href="/" onClick={() => setIsMenuOpen(false)}
              className={`flex flex-col gap-2 py-1 items-center border-b-[1px] justify-center transition-all duration-300 ease-out font-bold ${pathname === "/" ? 'text-m-indigo' : 'text-m-gray hover:text-m-indigo'}`}>
              <Images />
              <span>顔一覧</span>
            </Link>
            <Link href="/register" onClick={() => setIsMenuOpen(false)}
              className={`flex flex-col gap-2 py-1 items-center border-b-[1px] justify-center transition-all duration-300 ease-out font-bold ${pathname === "/register" ? 'text-m-indigo' : 'text-m-gray hover:text-m-indigo'}`}>
              <Clapperboard />
              <span className="font-bold">顔登録</span>
            </Link>
          </div>
        </div>
      )}
    </nav >
  )
}

export default NavBar;