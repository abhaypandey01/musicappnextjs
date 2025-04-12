"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type NavItem = {
  title: string;
  href?: string;
  submenu?: { title: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    submenu: [
      { title: "Web Development", href: "/services/web" },
      { title: "SEO", href: "/services/seo" },
      { title: "Marketing", href: "/services/marketing" },
    ],
  },
  {
    title: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
    <nav className="fixed top-2 px-5 bg-black shadow-md shadow-gray-400 z-50 rounded-4xl">
      <div className="flex justify-center space-x-8 py-4">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="relative"
            ref={openDropdown === index ? dropdownRef : null}
          >
            {item.submenu ? (
              <button
                onClick={() => handleClick(index)}
                className="text-gray-300 font-semibold hover:text-blue-500 focus:outline-none"
              >
                {item.title}
              </button>
            ) : item.href ? (
              <Link
                href={item.href}
                className="text-gray-300 font-semibold hover:text-blue-500"
              >
                {item.title}
              </Link>
            ) : (
              <span className="text-gray-700 font-semibold cursor-pointer">
                {item.title}
              </span>
            )}
            {item.submenu && openDropdown === index && (
              <div className="absolute top-full left-0 bg-black shadow-md rounded-md mt-2 py-2 w-48 z-50">
                {item.submenu.map((sub, subIndex) => (
                  <Link
                    key={subIndex}
                    href={sub.href}
                    className="block px-4 py-2 text-gray-200 hover:bg-gray-700 bg-black"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
    </div>
  );
}
